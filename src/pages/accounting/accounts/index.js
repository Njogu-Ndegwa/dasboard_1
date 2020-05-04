import CreateAccount from './components/Create';
import ListAccount from './components/List';

export const accountRoutes = [
    {
        path: "/accounts",
        exact: true,
        component: ListAccount,
        name: "ListAccount"
    },
    {
        path: "/accounts/add",
        component: CreateAccount,
        name: "CreateAccount"
    },
   
]; 