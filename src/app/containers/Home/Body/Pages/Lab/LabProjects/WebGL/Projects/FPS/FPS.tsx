import * as React from 'react';
import THREE = require('three');
import { isGL } from "../../../../../../../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IParams } from "../../../../../../../../../../data/models";
import {
    playerPositionX, playerPositionZ, playerRotationY, isFiring, playerRotationX
} from "../../../../../../../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";
import { loadBackground } from "./fixtures/background";
import { GatlingGun } from "./player/GatlingGun/gatlingGun";
import { CenteredText } from "../../../../../../../../../widgets/CenteredText";
import {IStore} from '../../../../../../../../../../redux/IStore';

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
    isFallback: boolean
}

export class FPS extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    gatlingGun = new GatlingGun();
    playerFocus = new THREE.Group;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false
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
        const isHeightChanged = nextProps.height !== this.props.height;
        const isWidthChanged = nextProps.width !== this.props.width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }
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
        this.camera.position.set(0, 16, 24);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.point = new THREE.PointLight( 0xffffff, 1 );
        this.playerFocus.add(this.point);
    }

    initAssets() {
        this.scene.add(this.gatlingGun.renderBullets());
        this.gatlingGun.assemble();
        this.playerFocus.add(this.gatlingGun.render());
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

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const { keysPressed } = this.props;

        const rotX = playerRotationX(keysPressed);
        const rotY = playerRotationY(keysPressed);

        const posX = playerPositionX(keysPressed, this.playerFocus.rotation.y);
        const posZ = playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        this.playerFocus.rotation.x += rotX;
        this.playerFocus.rotation.y += rotY;

        this.playerFocus.position.x += posX;
        this.playerFocus.position.z += posZ;

        this.renderer.render( this.scene, this.camera );

        const isFiringKey = isFiring(keysPressed);

        this.gatlingGun.fire(isFiringKey, this.playerFocus, keysPressed);

        this.point.intensity = isFiringKey ? Math.random() * 100 : 0;
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

export const FPSFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(FPS);
