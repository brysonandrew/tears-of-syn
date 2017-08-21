import * as React from 'react';
import { colors } from "../../../../../../../data/themeOptions";
import { ISocialMediaSelector } from "../../../../../../../data/models";
import { UnderlineToArrow } from "./UnderlineToArrow";

interface IProps {
    item: ISocialMediaSelector
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

interface IState {
    isHovered: boolean
}

export class MenuLeftItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        });
    }

    render(): JSX.Element {
        const { item, isTablet } = this.props;
        const { isHovered } = this.state;

        const styles = {
            menuLeftItem: {
                position: "relative",
                display: `${isTablet ? "" : "inline-"}block`,
                padding: "0px 10px",
                width: 100,
                cursor: "pointer",
                transition: "margin 200ms, padding 200ms"
            },
            menuLeftItem__inner: {
                display: "table-cell",
                verticalAlign: "middle",
                height: 50,
            },
            menuLeftItem__icon: {
                display: "inline-block",
                height: 20,
                width: "auto"
            },
            menuLeftItem__label: {
                display: "inline-block",
                height: 20,
                padding: "0px 10px",
                width: "auto",
                color: colors.gry
            },
            menuLeftItem__underline: {
                position: "absolute",
                top: 0,
                left: 0
            }
        } as any;
        return (
            <a  href={item.link}
                target={"_blank"}
                style={styles.menuLeftItem}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseEnter={() => this.handleMouseEnter()}>
                <div style={styles.menuLeftItem__inner}>
                    <img style={styles.menuLeftItem__icon}
                         src={item.icon}/>
                    <span style={styles.menuLeftItem__label}>
                        {item.label}
                    </span>
                </div>
                <div style={styles.menuLeftItem__underline}>
                    <UnderlineToArrow
                        isHovered={isHovered}
                    />
                </div>
            </a>
        );
    }
}
