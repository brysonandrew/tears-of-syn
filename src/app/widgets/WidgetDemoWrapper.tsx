import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class WidgetDemoWrapper extends React.Component<{}, {}> {

    @computed public get styles(): any {
        return {
            p: {
                id: "widget demo container",
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden"
            },
            inner: {
                position: "absolute",
                left: "50%",
                top: "50%",
                minHeight: 800,
                minWidth: 800,
                transform: "translate(-50%, -50%)"
            }
        };
    }

    render(): JSX.Element {
        return (
            <div style={this.styles.p}>
                <div style={this.styles.inner}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
