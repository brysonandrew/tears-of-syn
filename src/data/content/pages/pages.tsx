import * as React from 'react';
import { IPage } from '../../models';
import { toPath } from "../../helpers/toPath";
import { IDictionary, ISocialMediaSelector } from "../../models";
import { PortfolioFromStore } from '../../../app/containers/Home/Body/Pages/Portfolio/Portfolio';
import { LabFromStore } from '../../../app/containers/Home/Body/Pages/Lab/Lab';

function Page(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const pageList: IPage[] = [
    new Page(
        "Portfolio",
        <PortfolioFromStore/>

    ),
    new Page(
        "Lab",
        <LabFromStore/>
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});

export const headingMenuLeft: ISocialMediaSelector[] = [
    {
        name: "medium link",
        link: "https://medium.com/@codebroio",
        icon: "/images/Home/social media/medium.png",
        label: "blog"
    },
    {
        name: "youtube link",
        link: "https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA",
        icon: "/images/Home/social media/youtube.png",
        label: "vlog"
    }
];
