import * as React from 'react';
import { IPage } from './models';
import { toPath } from "./helpers/toPath";
import { IDictionary, IPortfolioProject, ILabProject, ISocialMediaSelector } from "./models";
import { PortfolioFromStore } from '../Home/Body/Pages/Portfolio/Portfolio';
import { LabFromStore } from '../Home/Body/Pages/Lab/Lab';
import { SpotlightFromStore } from '../Home/Body/Pages/Lab/LabProjects/Projects/Spotlight/Spotlight';
import { CruisingFromStore } from '../Home/Body/Pages/Lab/LabProjects/Projects/Cruising/Cruising';
import { FPSFromStore } from '../Home/Body/Pages/Lab/LabProjects/Projects/FPS/FPS';
import { ParticlesFromStore } from '../Home/Body/Pages/Lab/LabProjects/Projects/Particles/Particles';
import { particlesMenuItemList } from '../Home/Body/Pages/Lab/LabProjects/Projects/Particles/particlesMenu/particlesMenu';
import { ArmouryFromStore } from '../Home/Body/Pages/Lab/LabProjects/Projects/Armoury/Armoury';
import { armouryMenuItemList } from '../Home/Body/Pages/Lab/LabProjects/Projects/Armoury/armouryMenu/armouryMenu';
import { GarageFromStore } from '../Home/Body/Pages/Lab/LabProjects/Projects/Garage/Garage';
import { garageMenuItemList } from '../Home/Body/Pages/Lab/LabProjects/Projects/Garage/garageMenu/garageMenu';
import { IntroFromStore } from '../Home/Body/Pages/Lab/LabProjects/Intro/Intro';

function Page(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

function PortfolioProject(name, date, photoNumber, link) {
    this.name = name;
    this.path = toPath(this.name);
    this.link = link;
    this.imagePaths = new Array(photoNumber).fill("").map((_, i) => `/images/Projects/${this.path}/${i}.PNG`);
    this.date = date;
}

function LabProject(name, component, subComponents?) {
    this.name = name;
    this.path = toPath(this.name);
    this.subComponents = subComponents;
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

export const portfolioProjectList: IPortfolioProject[] = [
    new PortfolioProject(
        "Porizi",
        "2016",
        11,
        "http://www.porizi.com/"
    ),
    new PortfolioProject(
        "Coworkz",
        "2017",
        10,
        "https://cb-coworking.herokuapp.com"
    ),
    new PortfolioProject(
        "Gulumjan Consulting",
        "2017",
        6,
        "http://www.gulumjan-consulting.de/"
    )
];

export const labProjectList: ILabProject[] = [
    new LabProject(
        "Intro",
        <IntroFromStore/>
    ),
    new LabProject(
        "Spotlight",
        <SpotlightFromStore/>
    ),
    new LabProject(
        "Cruising",
        <CruisingFromStore/>
    ),
    new LabProject(
        "FPS",
        <FPSFromStore/>
    ),
    new LabProject(
        "Particles",
        <ParticlesFromStore/>,
        particlesMenuItemList
    ),
    new LabProject(
        "Armoury",
        <ArmouryFromStore/>,
        armouryMenuItemList
    ),
    new LabProject(
        "Garage",
        <GarageFromStore/>,
        garageMenuItemList
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});

export const portfolioProjects: IDictionary<IPortfolioProject> = portfolioProjectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});

export const labProjects: IDictionary<ILabProject> = labProjectList.reduce((acc, curr) => {
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
