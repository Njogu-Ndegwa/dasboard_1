import Allocation from './in_components/test';
import Add from './in_components/add';


export const accountRouted = [
    {
        path: '/allocation',
        component:Allocation,
        exact: true,
        name: 'Allocation'
    },

    {
        path: '/allocation/edit',
        component: Add,
        exact: true,
        name: 'Add'
    },
]