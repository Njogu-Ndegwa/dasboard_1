import Reciepts from './in_components/reciepts';
import NewReciepts from './in_components/new_reciept'


export const accountRouted = [

    {
        path: '/reciepts',
        component: Reciepts,
        exact: true,
        name: 'Reciepts'
    },

    {
        path: '/reciepts/add',
        component: NewReciepts,
        exact: true,
        name: 'New Reciepts'
    }
]