import * as React from 'react';
import THREE = require('three');
import { isGL } from "../../../../../../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IParams } from "../../../../../../../../../data/models";
import {
    playerPositionX, playerPositionZ, playerRotationY, playerRotationX
} from "../../../../../../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";
import { loadBackground } from "./fixtures/background";
import { CenteredText } from "../../../../../../../../widgets/CenteredText";
import { particlesMenuDictionary } from "./particlesMenu/particlesMenu";
import { IStore } from '../../../../../../../../../redux/IStore';

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

export class Particles extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    playerFocus = new THREE.Group;
    particles;

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
            this.removeByName("particles");
            this.initParticles(nextProps.savedParams.activeViewPath);
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
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.props.width / this.props.height,
            1,
            4000
        );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.point = new THREE.PointLight( 0xffffff, 0.5 );
        this.playerFocus.add(this.point);
        this.scene.add(new THREE.AmbientLight( 0xffffff, 0.1 ));
    }

    initAssets() {

        this.playerFocus.add(this.camera);
        this.playerFocus.position.set(0, 10, 100);
        this.playerFocus.rotation.order = "YXZ";
        this.scene.add(this.playerFocus);

        this.initParticles(this.props.savedParams.activeViewPath);

        Promise.all([
            loadGround(),
            loadBackground()
        ]).then((meshes) => {
            meshes.map(mesh => this.scene.add(mesh));
        });
    }

    removeByName(name) {
        const obj = this.scene.getObjectByName(name);
        this.scene.remove(obj);
    }

    initParticles(viewPath) {

        const key = viewPath
                        ?   viewPath
                        :   "fire";

        this.particles = particlesMenuDictionary[key].component;
        const particlesObj = this.particles.render();
        particlesObj.name =  "particles";

        this.scene.add(particlesObj);
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

        this.particles.animate();

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

export const ParticlesFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Particles);
