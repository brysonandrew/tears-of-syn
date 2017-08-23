import * as React from 'react';
import { colors } from "../../../../../../../../../data/themeOptions";

interface IProps {
    isHovered: boolean
}

interface IState {}

export class UnderlineToArrow extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isHovered } = this.props;

        const thickness = 2;
        const headRadius = 20;
        const sectionLength = 40;

        const styles = {
            underlineToArrow:
                isHovered
                    ?   {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 120,
                            height: thickness,
                            background: colors.std,
                            transform: "rotate(0deg) translate3d(0px, 42px, 0px)",
                            transition: "transform 500ms, width 500ms"
                        }
                    :   {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: sectionLength,
                            height: thickness,
                            background: colors.std,
                            transform: `rotate(0deg) translate3d(0px, 50px, 0px)`,
                            transition: "transform 500ms, width 500ms"
                    },
            underlineToArrow__headTop:
                isHovered
                    ?    {
                            position: "absolute",
                            top: 0,
                            right: -headRadius * 0.25,
                            width: headRadius * 0.5,
                            height: thickness,
                            background: colors.std,
                            transform: `rotate(-45deg) translate3d(-50%, 0%, 0px)`,
                            transition: "transform 500ms, right 500ms, width 500ms"
                        }
                    :   {
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: sectionLength,
                            height: thickness,
                            background: colors.std,
                            transform: `rotate(0deg) translate3d(40px, 0%, 0px)`,
                            transition: "transform 500ms, right 500ms, width 500ms"
                    },
            underlineToArrow__headBottom:
                isHovered
                    ?    {
                            position: "absolute",
                            top: 0,
                            right: -headRadius * 0.25,
                            width: headRadius * 0.5,
                            height: thickness,
                            background: colors.std,
                            transform: `rotate(45deg) translate3d(-50%, 0%, 0px)`,
                            transition: "transform 500ms, right 500ms, width 500ms"
                        }
                    :   {
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: sectionLength,
                            height: thickness,
                            background: colors.std,
                            transform: `rotate(0deg) translate3d(80px, 0%, 0px)`,
                            transition: "transform 500ms, right 500ms, width 500ms"
                    }
        } as any;
        return (
            <div style={styles.underlineToArrow}>
                <div style={ styles.underlineToArrow__headTop }/>
                <div style={ styles.underlineToArrow__headBottom }/>
            </div>
        );
    }
}
