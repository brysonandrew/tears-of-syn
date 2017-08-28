import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, HomeFromStore } from 'containers';
import { pageList } from '../../data/content/pages/pages';
import { labProjectList } from '../../data/content/pages/projects/lab';
import { portfolioProjectList } from '../../data/content/pages/projects/portfolio';
import { particlesMenuItemList } from '../containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Particles/particlesMenu/particlesMenu';
import { armouryMenuItemList } from '../containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Armoury/armouryMenu/armouryMenu';
import { garageMenuItemList } from '../containers/Home/Body/Pages/Lab/LabProjects/WebGL/Projects/Garage/garageMenu/garageMenu';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeFromStore}/>

    {/*pages*/}
    {pageList.map((page, i) =>
      <Route
        key={`pages-${i}`}
        path={page.path}
        component={HomeFromStore} />)}

    {/*projects*/}
    {portfolioProjectList.map((project, i) =>
      <Route
        key={`portfolio-projects-${i}`}
        path={`portfolio/${project.path}`}
        component={HomeFromStore} />)}

    {/*labs*/}
    {labProjectList.map((project, i) =>
      <Route
        key={`lab-projects-${i}`}
        path={`lab/${project.path}`}
        component={HomeFromStore} />)}
    {/*views*/}
    {particlesMenuItemList.map((view, i) =>
      <Route
        key={`views-${i}`}
        path={`lab/particles/${view.path}`}
        component={HomeFromStore} />)}
    {armouryMenuItemList.map((view, i) =>
      <Route
        key={`armoury-views-${i}`}
        path={`lab/armoury/${view.path}`}
        component={HomeFromStore} />)}
    {garageMenuItemList.map((view, i) =>
      <Route
        key={`garage-views-${i}`}
        path={`lab/garage/${view.path}`}
        component={HomeFromStore} />)}

  </Route>
);
