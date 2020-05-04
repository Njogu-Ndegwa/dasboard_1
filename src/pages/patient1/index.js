import Loadable from 'react-loadable';
import { view as Loader } from '../../components/loading';

const view = Loadable({
    loader: () => import('./view'),
    loading: Loader
});

export const routes = [
    {
        path: "/patient",
        exact: true,
        name: "Patient",
        component: view
    },
];

export { view };