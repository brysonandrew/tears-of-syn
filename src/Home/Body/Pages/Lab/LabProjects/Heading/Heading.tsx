import * as React from 'react';
import { connect } from 'react-redux';
import { colors } from "../../../../../../data/themeOptions";
import { Logo } from "../../../../../../Widgets/Logo/Logo";
import { PageHeading } from '../../../../../../Widgets/PageHeading';
import { IParams } from '../../../../../../data/models';
import { IStore } from '../../../../../../redux/IStore';

interface IProperties {
    savedParams?: IParams
    savedLocation?: Location
    isPreviewExtended?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
}

export class Heading extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted:  false
        };
    }

    componentDidMount() {
        this.timerId = setTimeout(() =>  this.setState({ isMounted: true }), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { isMobile, isTablet, isLaptop } = this.props;

        const styles = {
            heading: {
                position: "relative",
                textAlign: "right",
                height: 50,
                width: "100%",
            },
            heading__sub: {
                position: "relative",
                top: 50,
            },
            heading__main: {
                position: "absolute",
                right: 0,
                top: 0
            },
            heading__mainInner: {
                display: "table-cell",
                verticalAlign: "middle",
                color: colors.std,
                fontSize: 24,
                opacity: isMounted ? 1 : 0,
                transition: "opacity 200ms"
            },
            heading__mainText: {
                display: "inline-block",
                position: "relative",
                top: -5
            },
            heading__mainLogo: {
                display: "inline-block",
                height: 40,
                width: 40,
                padding: "5px 0",
                transform: "scale(0.8)"
            }
        } as any;
        return (
            <div style={styles.heading}>
                <div style={styles.heading__main}>
                    <div style={styles.heading__mainInner}>
                        <div style={styles.heading__mainText}>
                            <PageHeading
                                isMobile={isMobile}
                                isTablet={isTablet}
                                isLaptop={isLaptop}
                            />
                        </div>
                        <div style={styles.heading__mainLogo}>
                            <Logo/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isPreviewExtended: state.homeStore.isPreviewExtended,
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(): ICallbacks {
    return {};
}

export const HeadingFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Heading);
