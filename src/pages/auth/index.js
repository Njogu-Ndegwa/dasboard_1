import Loadable from 'react-loadable';
import Loader from '../../components/Loader';
import PageLoading from '../../components/PageLoading'

const Login = Loadable({
    loader: () => import('./components/Login'),
    loading: PageLoading
});

const LockedScreen = Loadable({
    loader: () => import('./components/Lock'),
    loading: PageLoading
});

const Signup = Loadable({
    loader: () => import('./components/Signup'),
    loading: PageLoading
});
const Forgot = Loadable({
    loader: () => import('./components/Forgot'),
    loading: PageLoading
});

export const routes = [
    {
        path: "/login",
        exact: true,
        name: "Login",
        component: Login
    },
    {
        path: "/lock",
        exact: true,
        name: "LockedScreen",
        component: LockedScreen
    },
    {
        path: "/signup",
        exact: true,
        name: "Signup",
        component: Signup
    },
    {
        path: "/password-reset",
        exact: true,
        name: "Forgot",
        component: Forgot
    },
];