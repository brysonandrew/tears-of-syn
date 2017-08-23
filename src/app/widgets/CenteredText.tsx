import * as React from 'react';

interface IProps {
    content: string
}

export class CenteredText extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            centeredText: {
                position: "absolute",
                left: 0,
                top: 0,
                display: "table",
                height: "100%",
                width: "100%"
            },
            centeredText__content: {
                display: "table-cell",
                textAlign: "center",
                verticalAlign: "middle",
                height: "100%",
                width: "100%"
            }
        } as any;
        return (
            <div style={ styles.centeredText }>
                <div style={ styles.centeredText__content }>
                    {this.props.content}
                </div>
            </div>
        );
    }
}
