import * as React from 'react';
import * as history from 'history';
import THREE = require('three');
import { isGL } from "../../../../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IParams } from "../../../../../../../data/models";
import {
    playerPositionX, playerPositionZ, playerRotationY, isFiring
} from "../../../../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";
import { loadBackground } from "./fixtures/background";
import { Flame } from "./player/Flame/flame";
import { CenteredText } from "../../../../../../../Widgets/CenteredText";
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
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isFallback: boolean
}

export class Firesword extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
    point;
    flame = new Flame();
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
        this.camera.position.set(0, 16, 50);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.point = new THREE.PointLight( 0xffffff, 1 );
        this.playerFocus.add(this.point);
    }

    initAssets() {
        // this.scene.add(this.flame.renderFire());
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

        const diffPosX = playerPositionX(keysPressed, this.playerFocus.rotation.y);
        const diffPosY = 0;
        const diffPosZ = playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        const diffRotY = playerRotationY(keysPressed);

        this.playerFocus.position.x += diffPosX;
        this.playerFocus.position.y += diffPosY;
        this.playerFocus.position.z += diffPosZ;

        // this.playerFocus.rotation.x+=diffRotX;
        this.playerFocus.rotation.y += diffRotY;
        // this.playerFocus.rotation.z+=diffRotZ;

        const isFiringKey = isFiring(keysPressed);

        // this.flame.fire(isFiringKey, sourcePos);

        this.point.intensity = isFiringKey ? 1 : 0;

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
export const FireswordFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Firesword);
