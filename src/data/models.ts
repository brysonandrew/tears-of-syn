import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

export interface IDictionary<T> {
    [key: string]: T
}

export interface IPageRoute {
    path: string
    component?: React.SFC<RouteComponentProps<any> | undefined>
}

export interface IParams {
    activePagePath?: string
    activeProjectPath?: string
    activeViewPath?: string
}

export interface IPage {
    name: string
    path: string
    component: JSX.Element
}

export interface IPortfolioProject {
    name: string
    path: string
    link: string
    imagePaths: string[]
    date: string
}

export interface ILabProject {
    name: string
    path: string
    component: any
    subComponents?: any[]
}

export interface ISocialMediaSelector {
    name: string
    link: string
    icon: string
    label: string
}

export interface IGrabParams {
    isActive: boolean
    origY: number
}
