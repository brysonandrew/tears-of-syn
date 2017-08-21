import { toPath } from "../../../../../../../../data/helpers/toPath";
import { IDictionary, ILabProject } from "../../../../../../../../data/models";
import { Sedan } from '../cars/Sedan/car';

function Project(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const garageMenuItemList: ILabProject[] = [
    new Project(
        "Sedan",
        new Sedan
    )
];

export const garageMenuDictionary: IDictionary<ILabProject> = garageMenuItemList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
