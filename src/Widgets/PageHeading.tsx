import * as React from 'react';
import * as history from 'history';
import { IParams } from '../data/models';
import { toParams } from '../data/helpers/toParams';

interface IProps {
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    onPageSelect?: (nextParams: IParams) => void
    history: history.History
}

interface IState {}

export class PageHeading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleClick(nextPath: string) {
        this.props.history.push(nextPath);
    }

    static nextPath(pagePath: string, params: IParams): string {
        return pagePath ===  params.activePagePath
                    ?   params.activeViewPath
                            ?   `/${pagePath}/${params.activeProjectPath}/${params.activeViewPath}`
                            :   params.activeProjectPath
                                    ?   `/${pagePath}/${params.activeProjectPath}`
                                    :   `/${pagePath}`
                    :   `/${pagePath}`;
    };

    render(): JSX.Element {
        const { history, isMobile } = this.props;
        const params: IParams = toParams(history.location.pathname);
        const pagePath = params.activePagePath ? params.activePagePath : "portfolio";
        const isPortfolio = !pagePath || pagePath === "portfolio";
        const mobileDisplay = `${!isMobile ? 'inline-' : ''}block`;

        const styles = {
            pageHeading: {

            },
            pageHeading__main: {
                display: mobileDisplay,
                float: isMobile ? 'none' : 'right',
                fontSize: 22,
            },
            pageHeading__options: {
                display: mobileDisplay,
                fontSize: 12,
                paddingRight: isMobile ? 0 : 16,
            },
            pageHeading__itemPortfolio: {
                display: "block",
                opacity: isPortfolio ? 1 : 0.22,
                cursor: isPortfolio ? "default" : "pointer"
            },
            pageHeading__itemLab: {
                display: "block",
                opacity: !isPortfolio ? 1 : 0.22,
                cursor: !isPortfolio ? "default" : "pointer"
            }
        } as any;

        return (
            <div style={ styles.pageHeading }>
                <div style={ styles.pageHeading__main }>
                    code bro
                </div>
                <div style={ styles.pageHeading__options }>
                    <span style={ styles.pageHeading__itemPortfolio }
                          onClick={() => this.handleClick(PageHeading.nextPath("portfolio", params))}>
                        PORTFOLIO
                    </span>
                    <span style={ styles.pageHeading__itemLab }
                          onClick={() => this.handleClick(PageHeading.nextPath("lab", params))}>
                        LAB
                    </span>
                </div>
            </div>
        );
    }
}
