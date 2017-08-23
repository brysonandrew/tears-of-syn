import { toPath } from '../../../helpers/toPath';
import { IDictionary, IPortfolioProject } from '../../../models';

function PortfolioProject(name, date, photoNumber, link) {
    this.name = name;
    this.path = toPath(this.name);
    this.link = link;
    this.imagePaths = new Array(photoNumber).fill("").map((_, i) => `/images/Projects/${this.path}/${i}.PNG`);
    this.date = date;
}

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

export const portfolioProjects: IDictionary<IPortfolioProject> = portfolioProjectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
