import * as React from 'react';
import { SpotlightFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Spotlight/Spotlight';
import { CruisingFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Cruising/Cruising';
import { FPSFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/FPS/FPS';
import { ParticlesFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Particles/Particles';
import { particlesMenuItemList } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Particles/particlesMenu/particlesMenu';
import { ArmouryFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Armoury/Armoury';
import { armouryMenuItemList } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Armoury/armouryMenu/armouryMenu';
import { GarageFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Garage/Garage';
import { garageMenuItemList } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Garage/garageMenu/garageMenu';
import { IntroFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Intro/Intro';
import { IDictionary, ILabProject } from '../../../models';
import { toPath } from '../../../helpers/toPath';

function LabProject(name, type, component, subComponents?) {
    this.name = name;
    this.path = toPath(this.name);
    this.type = type;
    this.subComponents = subComponents;
    this.component = component;
}

export const labProjectList: ILabProject[] = [
    new LabProject(
        "Intro",
        null,
        <IntroFromStore/>
    ),
    new LabProject(
        "Spotlight",
        'webGL',
        <SpotlightFromStore/>
    ),
    new LabProject(
        "Cruising",
        'webGL',
        <CruisingFromStore/>
    ),
    new LabProject(
        "FPS",
        'webGL',
        <FPSFromStore/>
    ),
    new LabProject(
        "Particles",
        'webGL',
        <ParticlesFromStore/>,
        particlesMenuItemList
    ),
    new LabProject(
        "Armoury",
        'webGL',
        <ArmouryFromStore/>,
        armouryMenuItemList
    ),
    new LabProject(
        "Garage",
        'webGL',
        <GarageFromStore/>,
        garageMenuItemList
    )
];

export const labProjects: IDictionary<ILabProject> = labProjectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
