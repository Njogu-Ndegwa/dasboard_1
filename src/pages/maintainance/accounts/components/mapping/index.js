import MapDetails from './inComponents/map_details';
import Maping from './inComponents/map';


export const accountRouted = [


{
    path: "/map",
    exact: true,
    component: MapDetails,
    name: "Map Details"
},

{
    path: "/map/add",
    exact: true,
    component: Maping,
    name: "Mapping"
},
]