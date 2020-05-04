import CancelledRequests from './components/canceledRequests';
import DailyMonthlyWeekly from './components/dailyMonthlyWeeklyReports';
import  FinancialReports from './components/financialReports';
import RequestsByArea from './components/requestsByArea';
import RequestsByMembers from './components/requestsByMembers';
import ReviewsByServiceProvider from './components/reviewsByServiceProviders';


export const accountRoutes = [
    {
        path: "/cr",
        exact: true,
        component: CancelledRequests,
        name: "Cancelled Requests"
    },
    {
        path: "/dmw",
        exact: true,
        component: DailyMonthlyWeekly,
        name: "Daily Monthly Weekly"
    },

    {
        path: "/fr",
        exact: true,
        component: FinancialReports,
        name: "Financial Reports"
    },
    {
        path: "/rba",
        exact: true,
        component: RequestsByArea,
        name: "Requests By Area"
    },
    {
        path: "/rbm",
        exact: true,
        component: RequestsByMembers,
        name: "Requests By Members"
    },
    {
        path: "/rbs",
        exact: true,
        component: ReviewsByServiceProvider,
        name: "Reviews By Service Provider"
    },
]