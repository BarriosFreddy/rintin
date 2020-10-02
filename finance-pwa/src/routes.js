import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Loans = React.lazy(() => import('./modules/loans'));
const DashboardDefault = React.lazy(() => import('./components/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./components/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./components/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./components/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./components/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./components/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./components/UIElements/Basic/Typography'));

const routes = [
    { path: '/loans', exact: true, name: 'Loans', component: Loans },
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
];

export default routes;