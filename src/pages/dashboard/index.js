
import view from './view'
// const view = Loadable({
//     loader: () => import('./view'),
//     loading: Loader
// });

export const routes = [
    {
        path: "/",
        exact: true,
        name: "Dashboard",
        component: view
    },
];

export { view };