import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// Users
const AddUser = Loadable(lazy(() => import('views/pages/users/page')));

// Companies
const CompanyView = Loadable(lazy(() => import('views/pages/companies/forms/view')));
const AddCompany = Loadable(lazy(() => import('views/pages/companies/page/add')));
const EditCompany = Loadable(lazy(() => import('views/pages/companies/page/view')));
const DetailCompany = Loadable(lazy(() => import('views/pages/companies/page/detail')));
const SettingsCompany = Loadable(lazy(() => import('views/pages/companies/page/settings')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'users',
            children: [
                {
                    path: '',
                    element: <h1>Users View</h1>
                }
            ]
        },
        {
            path: 'users',
            children: [
                {
                    path: 'add',
                    element: <AddUser />
                }
            ]
        },
        {
            path: 'companies',
            children: [
                {
                    path: '',
                    element: <CompanyView />
                }
            ]
        },
        {
            path: 'companies',
            children: [
                {
                    path: 'add',
                    element: <AddCompany />
                }
            ]
        },
        {
            path: 'companies',
            children: [
                {
                    path: 'edit',
                    element: <EditCompany />
                }
            ]
        },
        {
            path: 'companies',
            children: [
                {
                    path: 'detail',
                    element: <DetailCompany />
                }
            ]
        },
        {
            path: 'companies',
            children: [
                {
                    path: 'settings',
                    element: <SettingsCompany />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
