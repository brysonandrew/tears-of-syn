import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, HomeFromStore } from 'containers';
import { labProjectList, pageList, portfolioProjectList } from '../../data/content';
import {particlesMenuItemList} from '../../Home/Body/Pages/Lab/LabProjects/Projects/Particles/particlesMenu/particlesMenu';
import {armouryMenuItemList} from '../../Home/Body/Pages/Lab/LabProjects/Projects/Armoury/armouryMenu/armouryMenu';
import {garageMenuItemList} from '../../Home/Body/Pages/Lab/LabProjects/Projects/Garage/garageMenu/garageMenu';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeFromStore}/>

    {/*pages*/}
    {pageList.map((page, i) =>
      <Route
        key={i}
        path={page.path}
        component={HomeFromStore} />)}

    {/*projects*/}
    {portfolioProjectList.map((project, i) =>
      <Route
        key={i}
        path={`portfolio/${project.path}`}
        component={HomeFromStore} />)}
    {labProjectList.map((project, i) =>
      <Route
        key={i}
        path={`lab/${project.path}`}
        component={HomeFromStore} />)}

    {/*views*/}
    {particlesMenuItemList.map((view, i) =>
      <Route
        key={i}
        path={`lab/particles/${view.path}`}
        component={HomeFromStore} />)}
    {armouryMenuItemList.map((view, i) =>
      <Route
        key={i}
        path={`lab/armoury/${view.path}`}
        component={HomeFromStore} />)}
    {garageMenuItemList.map((view, i) =>
      <Route
        key={i}
        path={`lab/garage/${view.path}`}
        component={HomeFromStore} />)}

  </Route>
);
