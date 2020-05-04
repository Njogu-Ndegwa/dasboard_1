import Loadable from 'react-loadable';
import {view as Loader} from '../../components/loading';
import CreatePatient from "./components/CreateP"


/*
const CreatePatient = Loadable({
    loader: () => import("./components/CreatePatient"),
    loading: Loader
});


const ViewPatients = Loadable({
    loader: () => import("./components/PatientListing"),
    loading: Loading
});

const PatientDashBoard = Loadable({
    loader: () => import("./components/PatientDashBoard"),
    loading: Loading
});

const EmergencyRegistration = Loadable({
    loader: () => import("./components/EmergencyRegistration"),
    loading: Loading
});


const PatientQueue = Loadable({
    loader: () => import("./components/PatientQueue"),
    loading: Loading
});

const IPAdmission = Loadable({
    loader: () => import("./components/Admission"),
    loading: Loading
});

*/
export const routes = [

  {
      path: "/patient-registration",
      component: CreatePatient,
      name: "createPatient"
  }
    /*,
    {
        path: "/listPatients",
        exact: true,
        component: ViewPatients,
        name: "viewPatients"
    },
    {
        path: "/patientDashboard",
        exact: true,
        component: PatientDashBoard,
        name: "patientDashboard"
    },
    {
        path: "/emergencyRegistration",
        exact: true,
        component: EmergencyRegistration,
        name: "EmergencyRegistration"
    },
    {
        path: "/patientQueue",
        exact: true,
        component: PatientQueue,
        name: "patientQueue"
    },
    {
        path: "/ip-admission",
        exact: true,
        component: IPAdmission,
        name: "IPAdmission"
    }
  */
];
