import { toPath } from '../../../helpers/toPath';
import { IDictionary, IPortfolioProject } from '../../../models';

function PortfolioProject(name, date, photoNumber, link) {
    this.name = name;
    this.path = toPath(this.name);
    this.link = link;
    this.imagePaths = Array.apply(null, new Array(photoNumber)).map((_, i) => `/images/Projects/${this.path}/${i}.png`);
    this.date = date;
}

export const portfolioProjectList: IPortfolioProject[] = [
    new PortfolioProject(
        "Porizi",
        "2016",
        3,
        "http://www.porizi.com/"
    ),
    new PortfolioProject(
        "Coworkz",
        "2017",
        3,
        "https://cb-coworking.herokuapp.com"
    ),
    new PortfolioProject(
        "Gulumjan Consulting",
        "2017",
        1,
        "http://www.gulumjan-consulting.de/"
    )
];

export const portfolioProjects: IDictionary<IPortfolioProject> = portfolioProjectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
