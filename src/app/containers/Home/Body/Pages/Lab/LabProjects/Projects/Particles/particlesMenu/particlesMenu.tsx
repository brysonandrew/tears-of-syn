import { toPath } from "../../../../../../../../../../data/helpers/toPath";
import { IDictionary, ILabProject } from "../../../../../../../../../../data/models";
import { BasicExplosion } from "../particleModels/explosions/Basic/basic";
import { RandomSparks } from "../particleModels/explosions/RandomSparks/randomSparks";
import { FireBlade } from "../particleModels/elements/FireBlade/fireBlade";
import { Flame } from "../particleModels/elements/Fire/fire";
import { Snow } from '../particleModels/elements/Snow/snow';
import { Rain } from '../particleModels/elements/Rain/rain';
import { Frost } from '../particleModels/elements/Frost/frost';

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const particlesMenuItemList: ILabProject[] = [
    new Project(
        "Basic",
        new BasicExplosion
    ),
    new Project(
        "Embers",
        new RandomSparks
    ),
    new Project(
        "Fire Blade",
        new FireBlade
    ),
    new Project(
        "Fire",
        new Flame
    ),
    new Project(
        "Snow",
        new Snow
    ),
    new Project(
        "Rain",
        new Rain
    ),
    new Project(
        "Frost",
        new Frost
    )
];

export const particlesMenuDictionary: IDictionary<ILabProject> = particlesMenuItemList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
