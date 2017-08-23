import * as React from 'react';
import {colors} from "../../../../../../../../../data/themeOptions";

interface IProps {
    isHovered: boolean
    previewWidth?: number
}

interface IState {}

export class ProjectHeadingUnderline extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isHovered, previewWidth } = this.props;

        const width = previewWidth * 0.5;

        const styles = {
            projectHeadingUnderline: {
                position: "relative",
                top: 0,
                left: width * 0.75,
                transform: `translate3d(0px, ${isHovered ? 80 : 0}px, 0px)`,
                transition: "transform 200ms"
            },
            projectHeadingUnderline__left: {
                position: "absolute",
                top: 0,
                left: 0,
                background: colors.std,
                width: width * 0.5,
                height: 2,
                transform: `rotate(${isHovered ? -22 : 0}deg) 
                            translate3d(${isHovered ? width * 0.025 : width * 0.75}px, 0px, 0px) 
                            scaleX(${isHovered ? 0.1 : 1})`,
                transition: "transform 200ms"
            },
            projectHeadingUnderline__right: {
                position: "absolute",
                top: 0,
                left: 0,
                background: colors.std,
                width: width * 0.5,
                height: 2,
                transform: `rotate(${isHovered ? 22 : 0}deg) 
                            translate3d(${isHovered ? -width * 0.025 : -width * 0.75}px, 0px, 0px) 
                            scaleX(${isHovered ? 0.1 : 1})`,
                transition: "transform 200ms"
            },
        } as any;
        return (
            <div style={ styles.projectHeadingUnderline }>
                <div style={styles.projectHeadingUnderline__left}/>
                <div style={styles.projectHeadingUnderline__right}/>
            </div>
        );
    }
}
