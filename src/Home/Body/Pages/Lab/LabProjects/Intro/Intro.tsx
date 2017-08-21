import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { IParams } from "../../../../../../data/models";
import { labProjectList } from '../../../../../../data/content';
import { IntroContents } from './IntroContents';
import { IStore } from '../../../../../../redux/IStore';

interface IProperties {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    savedParams?: IParams
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    keysPressed?: string
    mx?: number
    my?: number
}

interface IState extends IProperties, ICallbacks {}

export class Intro extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {};
        this.handlePagesMenuClick = this.handlePagesMenuClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.keysPressed.length > 0) {

            const firstPath = labProjectList[1].path;

            browserHistory.push(`/lab/${firstPath}`);
        }
    }

    handlePagesMenuClick(i) {
        const projectPath = labProjectList[i].path;
        const path = `/lab/${projectPath}`;
        this.handleParamsChange(path);
    }

    handleParamsChange(path) {
        browserHistory.push(path);
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop } = this.props;
        const styles = {
            intro: {
                display: "table",
                height: "100%",
                width: "100%"
            },
            intro__inner: {
                display: "table-cell",
                textAlign: "center",
                verticalAlign: "middle",
                height: "100%",
                width: "100%"
            }
        } as any;

        return (
            <div style={ styles.intro }>
                <div style={ styles.intro__inner }>
                    <IntroContents
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                        onProjectClick={this.handlePagesMenuClick}/>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore): IProperties {
    return {
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(): ICallbacks {
    return {};
}

export const IntroFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Intro);
