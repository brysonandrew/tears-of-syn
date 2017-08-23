import * as React from 'react';
import { connect } from 'react-redux';
import { colors } from "../../../../../../../../../data/themeOptions";
import { toggleMenu } from '../../../../../../HomeActionCreators';
import { IStore } from '../../../../../../../../../redux/IStore';

interface IProperties {
    isMenuOpen?: boolean
}

interface ICallbacks {
    onMenuButtonClick?: (isMenuOpen: boolean) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovered?: boolean
}

export class MenuButton extends React.Component<IProps, IState> {

    boxNumber = 5;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter() {
        this.setState({isHovered: true});
    }

    handleMouseLeave() {
        this.setState({isHovered: false});
    }

    handleClick() {
        const isMenuOpen = !this.props.isMenuOpen;
        this.props.onMenuButtonClick(isMenuOpen);
    }

    render(): JSX.Element {
        const { isMenuOpen } = this.props;
        const { isHovered } = this.state;

        const styles = {
            menuButton: {
                position: "relative",
                display: "inline-block",
                width: 40,
                height: 40,
                cursor: "pointer"
            },
            menuButton__icon: {
                position: "absolute",
                width: "100%",
                left: 0,
                top:  "50%",
                transform: "translateY(-50%)"
            },
            menuButton__line: {
                position: "absolute",
                width: `${100 / this.boxNumber}%`,
                height: 4,
                background: colors.hi,
                transition: "transform 200ms"
            }
        } as any;
        return (
            <div style={ styles.menuButton }
                 onClick={() => this.handleClick()}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                <div style={ styles.menuButton__icon }>
                    {Array.apply(null, new Array(this.boxNumber)).map((_, i) =>
                        <div key={i}
                             style={ Object.assign({}, styles.menuButton__line,
                            {
                                transform: `rotate(${isMenuOpen ? 45 : 0}deg)
                                            translateX(${(i + 1) * this.boxNumber * 10}%) translate3d(${isMenuOpen ? -6 : 0}px, ${isMenuOpen ? -7 : isHovered ? 18 : 15}px, 0px)`,
                                transitionDelay: `${(i + 1) * this.boxNumber * 2}ms`
                            }) }/>)}
                    <div style={ Object.assign({}, styles.menuButton__line,
                        {
                            width: "90%",
                            left: "10%",
                            transform: `scaleX(${isMenuOpen ? 0 : 1})`
                        }) }/>
                    {Array.apply(null, new Array(this.boxNumber)).map((_, i) =>
                        <div key={i}
                             style={ Object.assign({}, styles.menuButton__line,
                            {
                                transform: `rotate(${isMenuOpen ? -45 : 0}deg)
                                            translateX(${(i + 1) * this.boxNumber * 10}%) translate3d(${isMenuOpen ? -6 : 0}px, ${isMenuOpen ? 7 : isHovered ? -18 : -15}px, 0px)`,
                                transitionDelay: `${(i + 1) * this.boxNumber * 2}ms`
                            }) }/>)}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
        isMenuOpen: state.homeStore.isMenuOpen
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onMenuButtonClick: (isMenuOpen) => {
            dispatch(toggleMenu(isMenuOpen));
        }
    };
}

export const MenuButtonFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(MenuButton);
