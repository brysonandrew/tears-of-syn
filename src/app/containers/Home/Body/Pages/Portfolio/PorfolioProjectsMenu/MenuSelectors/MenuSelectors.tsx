import * as React from 'react';
import { connect } from 'react-redux';
import { MenuSelector } from "./MenuSelector";
import { toggleMenu, toggleScrollAnimation } from "../../../../../HomeActionCreators";
import { portfolioProjectList } from "../../../../../../../../data/content/pages/projects/portfolio";
import { IParams } from "../../../../../../../../data/models";
import { IStore } from '../../../../../../../../redux/IStore';

interface IProperties {
    isMenuOpen?: boolean
    isTablet?: boolean
    isWheel?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationStart?: () => void
    onCloseMenu?: () => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
}

export class MenuSelectors extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.handleSelectorClick = this.handleSelectorClick.bind(this);
    }

    private handleSelectorClick(nextPath) {
        const { isTablet, isMenuOpen, onCloseMenu, onAnimationStart } = this.props;
        if (isTablet && isMenuOpen) {
            onCloseMenu();
        }
        onAnimationStart();
    }

    public render(): JSX.Element {
        const { isMenuOpen, isTablet, savedParams, isWheel } = this.props;

        const styles = {
            menuSelectors: {
                display: "inline-block"
            }
        };

        return (
            <div style={ styles.menuSelectors }>
                {portfolioProjectList.map((content, i) =>
                    <MenuSelector
                        key={i}
                        isMenuOpen={isMenuOpen}
                        isWheel={isWheel}
                        isTablet={isTablet}
                        selectorIndex={i}
                        content={content}
                        savedParams={savedParams}
                        onClick={this.handleSelectorClick}
                    />)}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
        isMenuOpen: state.homeStore.isMenuOpen,
        isWheel: state.homeStore.isWheel,
        isTablet: state.homeStore.isTablet,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        },
        onCloseMenu: () => {
            dispatch(toggleMenu(false));
        }
    };
}

export let MenuSelectorsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(MenuSelectors);
