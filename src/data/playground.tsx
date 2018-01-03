import * as React from "react";
import {LogoWithWrapper} from '../app/widgets/Logo';
import {toPath} from './helpers/toPath';

interface IPlaygroundPage {
    name: string
    path: string
    component: JSX.Element
}

function PlaygroundPage(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const PLAYGROUND: IPlaygroundPage[] = [
    new PlaygroundPage("Logo", LogoWithWrapper),
];
