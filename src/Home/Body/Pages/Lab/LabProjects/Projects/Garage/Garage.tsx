import * as React from 'react';
import THREE = require('three');
import { isGL } from "../../../../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IParams } from "../../../../../../../data/models";
import {
    playerPositionX, playerPositionZ, playerRotationY
} from "../../../../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";
import { loadBackground } from "./fixtures/background";
import { CenteredText } from "../../../../../../../Widgets/CenteredText";
import { garageMenuDictionary } from './garageMenu/garageMenu';
import { IStore } from '../../../../../../../redux/IStore';

interface IProperties {
    width?: number
    height?: number
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    savedParams?: IParams
    parentEl?: HTMLDivElement
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    keysPressed?: string
    mx?: number
    my?: number
}

interface IState extends IProperties, ICallbacks {
    isFallback?: boolean
    isCarAdded?: boolean
}

export class Garage extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    car;
    playerFocus = new THREE.Group;
    circleLights;
    circleLightRadius = 20;
    defaultView = "sedan";

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false,
            isCarAdded: false
        };
    }

    componentDidMount() {
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
        if (isGL()) {
            this.props.parentEl.removeChild( this.renderer.domElement );
        }
    }

    componentWillReceiveProps(nextProps) {
        const { height, width, savedParams } = this.props;

        const isHeightChanged = nextProps.height !== height;
        const isWidthChanged = nextProps.width !== width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }

        const isViewPathChanged = nextProps.savedParams.activeViewPath !== savedParams.activeViewPath;

        if (isViewPathChanged) {
            this.removeByName("car");
            this.initcar(nextProps.savedParams.activeViewPath);
        }
    }

    removeByName(name) {
        const obj = this.scene.getObjectByName(name);
        this.scene.remove(obj);
    }

    initGL() {
        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.initLighting();
        this.initAssets();
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true });
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.props.width, this.props.height );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45, this.props.width / this.props.height, 1, 4000 );
        this.camera.position.set(0, 10, 50);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        const lights = [ null, null, null, null ];
        this.circleLights = lights.map(light => {
            light = new THREE.PointLight( 0xffffff, 0.15 );
            this.scene.add(light);
            return light;
        });
        // player lights
        this.point = new THREE.PointLight( 0xffffff, 0 );
        this.playerFocus.add(this.point);
    }

    initAssets() {
        this.initcar(this.props.savedParams.activeViewPath);
        this.playerFocus.add(this.camera);
        this.playerFocus.rotation.order = "YXZ";
        this.scene.add(this.playerFocus);

        Promise.all([
            loadGround(),
            loadBackground()
        ]).then((meshes) => {
            meshes.map(mesh => this.scene.add(mesh));
        });
    }

    initcar(viewPath) {

        const key = viewPath
                    ?   viewPath
                    :   this.defaultView;

        this.car = garageMenuDictionary[key].component;
        this.car.assemble();
        this.car = this.car.render();
        this.car.name =  "car";

        this.scene.add(this.car);

        this.setState({
            isCarAdded: true
        });
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const { keysPressed } = this.props;
        const { isCarAdded } = this.state;

        const diffPosX = playerPositionX(keysPressed, this.playerFocus.rotation.y);
        const diffPosY = 0;
        const diffPosZ = playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        const diffRotY = playerRotationY(keysPressed);

        this.playerFocus.position.x += diffPosX;
        this.playerFocus.position.y += diffPosY;
        this.playerFocus.position.z += diffPosZ;

        this.playerFocus.rotation.y += diffRotY;

        if (isCarAdded) {

            this.car.rotation.y += 0.1;

            this.circleLights.forEach((light, i) => {
                const r = (this.circleLightRadius - Math.cos(this.car.rotation.y) * this.circleLightRadius * 0.5);
                light.position.x = Math.sin(-this.car.rotation.y + Math.PI * 2 / this.circleLights.length * (i + 1)) * r;
                light.position.y = r;
                light.position.z = Math.cos(-this.car.rotation.y + Math.PI * 2 / this.circleLights.length * (i + 1)) * r;
            });

        }

        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            this.state.isFallback
            &&  <CenteredText
                    content={"Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."}
                />
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(): ICallbacks {
    return {};
}

export const GarageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Garage);
