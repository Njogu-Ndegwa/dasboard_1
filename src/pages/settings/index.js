import Loadable from 'react-loadable';
import { view as Loader } from '../../components/loading';
import updateSettings from './update_settings';
import Settings from './global_settings'

// const Settings = Loadable({
//     loader: () => import('./global_settings'),
//     loading: Loader
// });

// const view = Loadable({
//     loader: () => import('./update_settings'),
//     loading: Loader
// });

export const routes = [
    {
        path: "/settings",
        exact: true,
        name: "Settings",
        component: Settings
    },

    {
        path: "/settings/update",
        exact: true,
        name: "Settings",
        component: updateSettings
    },
];

