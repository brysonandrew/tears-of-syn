import * as React from 'react';
import * as THREE from 'three';
import { inject, observer } from 'mobx-react';
import { renderIfTrue } from '../../utils/react';
import { isGL } from '../../utils/game';
import { CenteredText } from '../../widgets';
import {Wall} from './wall';
import {createArrayOf} from '../../utils/array';
import {Candle} from './candle';

const NUMBER_OF_CANDLES = 8;
const RADIUS = 25;

interface IProps {
    parentEl: HTMLDivElement
    docScroll: number
    width: number
    height: number
    textBoundary: number
}

interface IState {
    isFallback: boolean
    mx?: number
    my?: number
}

@inject('store')
@observer
export class Background extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    light;
    candleInitArray: number[] = createArrayOf(Math.random() * RADIUS / NUMBER_OF_CANDLES, NUMBER_OF_CANDLES);
    candles: Candle[] = [];
    wall = new Wall();

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false,
            mx: 0,
            my: 0
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);

        window.removeEventListener('mousemove', this.handleMouseMove);

        if (isGL()) {
            this.props.parentEl.removeChild( this.renderer.domElement );
        }
    }

    componentWillReceiveProps(nextProps) {
        const { height, width } = this.props;

        const isHeightChanged = nextProps.height !== height;
        const isWidthChanged = nextProps.width !== width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }
    }

    handleMouseMove = (e) => {
        this.setState({
            mx: e.pageX,
            my: e.pageY
        });
    };

    initGL() {
        this.initRenderer();

        this.initAssets();
        this.initLighting();
        this.initScene();

        this.initCamera();

        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true });
    }

    initRenderer() {
        const { height, width } = this.props;

        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize( width, height );
        this.renderer.domElement.style.position = "fixed";
        this.renderer.domElement.style.top = 0;
        this.renderer.domElement.style.left = 0;
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initCamera() {
        const { height, width } = this.props;

        this.camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            1,
            8000
        );
        this.camera.position.z = 80;
    }

    initLighting() {
        this.light = new THREE.AmbientLight( 0xFFFFFF, 0.25 );
    }

    initAssets() {
        this.wall.init();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.candleInitArray.forEach((random, i) => {
            let candle = new Candle();
            candle["random"] = random;
            this.scene.add(candle.render(i));
            this.candles[i] = candle;
        });
        this.scene.add(this.wall.render());
        // this.scene.add(this.light);
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        this.candles.forEach((candle, i) => {
            const scrollDiff = Math.sin(this.props.docScroll * 0.0001) * candle["random"];
            candle.move("x", Math.cos(Math.PI * (i / (NUMBER_OF_CANDLES - 1))) * -RADIUS + scrollDiff);
            candle.move("y", Math.sin(Math.PI * (i / (NUMBER_OF_CANDLES - 1))) * -RADIUS - RADIUS + scrollDiff);
            candle.move("z", scrollDiff);
            candle.animate();
        });
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            <div>
                {renderIfTrue(this.state.isFallback, () =>
                    <CenteredText
                        content="Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."
                    />
                )}
            </div>

        );
    }
}
