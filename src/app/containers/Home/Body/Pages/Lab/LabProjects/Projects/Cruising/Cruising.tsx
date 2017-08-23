import * as React from 'react';
import THREE = require('three');
import { isGL } from "../../../../../../../../../data/helpers/WebGL";
import { connect } from 'react-redux';
import { IParams } from "../../../../../../../../../data/models";
import { playerPositionX, playerPositionZ, playerRotationY
} from "../../../../../../../../../data/helpers/controls/keyboard";
import { loadGround } from "./fixtures/ground";
import { loadBackground } from "./fixtures/background";
import { createCar } from "./player/car";
import {IStore} from '../../../../../../../../../redux/IStore';

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

export class Cruising extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    texture;
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
        this.initPlayerFocus();
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
        this.camera = new THREE.PerspectiveCamera( 45,
            this.props.width / this.props.height, 1, 4000 );

        this.camera.position.set(0, 280, 400);
        this.camera.lookAt(this.playerFocus.position);

        this.scene.add(this.camera);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        const point = new THREE.PointLight( 0xffffff, 1, 100 );
        point.position.set( 0, 50, 0 );
        this.playerFocus.add(point);
    }

    initAssets() {
        Promise.all([
            loadGround(),
            loadBackground()
        ]).then((meshes) => {
            meshes.map(mesh => this.scene.add(mesh));
        });
        createCar().then((car) => this.playerFocus.add(car));
    }

    initPlayerFocus() {
        this.scene.add(this.playerFocus);
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        const { keysPressed } = this.props;

        this.playerFocus.rotation.y += playerRotationY(keysPressed);

        this.playerFocus.position.z += playerPositionZ(keysPressed, this.playerFocus.rotation.y);

        this.playerFocus.position.x += playerPositionX(keysPressed, this.playerFocus.rotation.y);

        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        // const { isMobile, isTablet, isLaptop } = this.props;
        const styles = {
            world: {
                position: "absolute",
                left: 0,
                top: 0,
                display: "table",
                height: "100%",
                width: "100%"
            },
            world__noGLMessage: {
                display: "table-cell",
                textAlign: "center",
                verticalAlign: "middle",
                height: "100%",
                width: "100%"
            }
        } as any;

        return (
            this.state.isFallback
            &&  <div style={ styles.main }>
                    <div style={ styles.world__noGLMessage }>
                        {"Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."}
                    </div>
                </div>
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

export const CruisingFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Cruising);
