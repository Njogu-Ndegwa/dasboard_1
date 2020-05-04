import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const Facility = Loadable({
    loader: () =>
        import ("./components/facility/Facility"),
    loading: Loading
});
const Department = Loadable({     
    loader: () =>
        import ("./components/department/Department"),
    loading: Loading
});
const Bed = Loadable({
    loader: () =>
        import ("./components/bed/Bed"),
    loading: Loading
});
const Ward = Loadable({
    loader: () =>
        import ("./components/ward/Ward"),
    loading: Loading
});

const Room = Loadable({
    loader: () =>
        import ("./components/room/Room"),
    loading: Loading
});

const RoomType = Loadable({
    loader: () =>
        import ("./components/room/RoomType"),
    loading: Loading
});

const PatientIdentificationType = Loadable({
    loader: () =>
        import ("./components/PatientIdentification/PatientIdentificationType"),
    loading: Loading
});


const Bank = Loadable({
    loader: () =>
        import ("./components/bank/Bank"),
    loading: Loading
});





export const routes = [
    {
        path: "/facility",
        exact: true,
        component: Facility,
        name: "Facility"
    },
    {
        path: "/facilityDepartments",
        exact: true,
        component: Department,
        name: "Department"
    },
    {
        path: "/facilityBed",
        exact: true,
        component: Bed,
        name: "Bed"
    },
    {
        path: "/facilityWards",
        exact: true,
        component: Ward,
        name: "Ward"
    },
    {
        path: "/facilityRooms",
        exact: true,
        component: Room,
        name: "room"
    },
    {
        path: "/room-type",
        exact: true,
        component: RoomType,
        name: "RoomType"
    },
    {
        path: "/banks",
        exact: true,
        component: Bank,
        name: "bank"
    },
    {
        path: "/patientIdentificationType",
        exact: true,
        component: PatientIdentificationType,
        name: "PatientIdentificationType"
    }


];

// export * from "./appointmentReducers";
