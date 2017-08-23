import * as React from 'react';
import { colors } from '../../data/themeOptions';

interface IProps {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

export class HeadingSub extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMobile, isTablet } = this.props;

        const styles = {
            headingSub: {
                position: "absolute",
                fontSize: 10,
                textAlign: "center",
                top: isMobile ? 100 : isTablet ? 50 : 0,
                width: "100%",
            },
            headingSub__text: {
                position: "absolute",
                left: "50%",
                color: colors.std,
                transform: "translate(-50%, -50%)",
                width: 480
            },
            headingSub__lineLeft: {
                position: "absolute",
                left: 240,
                top: 0,
                width: "calc(50% - 480px)"
            },
            headingSub__lineRight: {
                position: "absolute",
                right: 0,
                top: 0,
                width: "calc(50% - 240px)"
            },
            headingSub__line: {
                display: "inline-block",
                height: 2,
                background: colors.std,
                transition: "transform 200ms"
            }
        } as any;
        return (
            <div style={ styles.headingSub }>
                <span>
                    <pre style={styles.headingSub__text}>
                       {`${isTablet ? "" : "F    R    E    E    L    A    N    C    E        "}W    E    B        D    E    V    E    L    O    P    E    R`}
                    </pre>
                </span>
               {!isTablet
               &&   <div>
                       <div style={{
                           ...styles.headingSub__lineLeft,
                           ...styles.headingSub__line
                       }}/>
                       <div style={{
                           ...styles.headingSub__lineRight,
                           ...styles.headingSub__line
                       }}/>
                    </div>}
            </div>
        );
    }
}
