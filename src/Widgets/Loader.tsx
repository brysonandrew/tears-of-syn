import * as React from 'react';
import { colors } from "../data/themeOptions";

export class Loader extends React.Component<any, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            loader: {
                width: "calc(100% - 40px)",
                margin: 20,
                height: "100vh",
                backgroundImage: `linear-gradient(to right, ${colors.std}, ${colors.wht}, ${colors.std}, ${colors.wht})`,
                backgroundSize: "600%",
                backgroundPosition: "0 0",
                animationDuration: "5000ms",
                animationIterationCount: "infinite",
                animationName: "gradients"
            }
        } as any;
        return (
            <div style={ styles.loader }/>
        );
    }
}
