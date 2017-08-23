import * as React from 'react';
import { SpotlightFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Spotlight/Spotlight';
import { CruisingFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Cruising/Cruising';
import { FPSFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/FPS/FPS';
import { ParticlesFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Particles/Particles';
import { particlesMenuItemList } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Particles/particlesMenu/particlesMenu';
import { ArmouryFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Armoury/Armoury';
import { armouryMenuItemList } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Armoury/armouryMenu/armouryMenu';
import { GarageFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Garage/Garage';
import { garageMenuItemList } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Projects/Garage/garageMenu/garageMenu';
import { IntroFromStore } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/Intro/Intro';
import { IDictionary, ILabProject } from '../../../models';
import { toPath } from '../../../helpers/toPath';

function LabProject(name, component, subComponents?) {
    this.name = name;
    this.path = toPath(this.name);
    this.subComponents = subComponents;
    this.component = component;
}

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

export const labProjects: IDictionary<ILabProject> = labProjectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
