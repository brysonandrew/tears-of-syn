import * as React from 'react';
import { labProjectList } from "../../../../../../../data/content/pages/projects/lab";
import { MenuItem } from "./MenuItem";
import { connect } from 'react-redux';
import { toggleMenu } from '../../../../HomeActionCreators';
import { MenuButton } from "../../../../../../widgets/MenuButton";
import { IParams } from "../../../../../../../data/models";
import { IStore } from '../../../../../../../redux/IStore';

interface IProperties {
    isMenuOpen?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onMenuOpen?: () => void
    onMenuClose?: () => void
}

interface IProps extends IProperties, ICallbacks {
    onProjectMenuClick?: (index: number) => void
    onSubProjectMenuClick?: (index: number) => void
}

interface IState extends IProperties, ICallbacks {
    isMenuExpanded?: boolean
}

export class Menu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMenuExpanded: false
        };
        this.handleMenuExpand = this.handleMenuExpand.bind(this);
        this.handleMenuCondense = this.handleMenuCondense.bind(this);
    }

    handleMenuExpand() {
        this.setState({
            isMenuExpanded: true
        });
    }

    handleMenuCondense() {
        this.setState({
            isMenuExpanded: false
        });
    }

    render(): JSX.Element {
        const {
            isMenuOpen,
            onMenuOpen,
            onMenuClose,
            savedParams,
            onProjectMenuClick,
            onSubProjectMenuClick
        } = this.props;

        const styles = {
            pagesMenu: {
                textAlign: "left"
            },
            pagesMenu__items: {
                display: "block",
                verticalAlign: "top"
            }
        };

        return (
            <div style={styles.pagesMenu}>
                <MenuButton
                    isACross={isMenuOpen}
                    onClick={isMenuOpen ? onMenuClose : onMenuOpen}
                />
                {isMenuOpen &&  <div style={styles.pagesMenu__items}>
                                    {labProjectList.map((content, i) =>
                                        content.path !== "intro"
                                        &&  <MenuItem
                                                key={i}
                                                index={i}
                                                savedParams={savedParams}
                                                isMenuOpen={isMenuOpen}
                                                content={content}
                                                onClick={onProjectMenuClick}
                                                onSubProjectMenuClick={onSubProjectMenuClick}
                                            />)}
                                </div>}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore): IProperties {
    return {
        isMenuOpen: state.homeStore.isMenuOpen,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onMenuOpen: () => {
            dispatch(toggleMenu(true));
        },
        onMenuClose: () => {
            dispatch(toggleMenu(false));
        }
    };
}

export const MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);
