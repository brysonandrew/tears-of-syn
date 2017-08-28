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
import { BasicBaby } from '../../../../app/containers/Home/Body/Pages/Lab/LabProjects/ReactMotion/BasicBaby';

function LabProject(name, technologies, component, subComponents?) {
    this.name = name;
    this.path = toPath(this.name);
    this.technologies = technologies;
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
        "Basic Baby",
        ['React Motion'],
        <BasicBaby/>
    ),
    new LabProject(
        "Spotlight",
        ['THREE.js'],
        <SpotlightFromStore/>
    ),
    new LabProject(
        "Cruising",
        ['THREE.js'],
        <CruisingFromStore/>
    ),
    new LabProject(
        "FPS",
        ['THREE.js'],
        <FPSFromStore/>
    ),
    new LabProject(
        "Particles",
        ['THREE.js'],
        <ParticlesFromStore/>,
        particlesMenuItemList
    ),
    new LabProject(
        "Armoury",
        ['THREE.js'],
        <ArmouryFromStore/>,
        armouryMenuItemList
    ),
    new LabProject(
        "Garage",
        ['THREE.js'],
        <GarageFromStore/>,
        garageMenuItemList
    )
];

export const labProjects: IDictionary<ILabProject> = labProjectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
