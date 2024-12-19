import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Jobs from './components/jobs/Jobs';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import MyApplication from './components/MyApplication';
import JobDescription from './components/JobDescription';
import Messages from './components/Messages';
import BookMark from './components/BookMark';
import ManageResume from './components/ManageResume';
import AddResume from './components/AddResume';
import Contact from './components/Contact';
import Blog from './components/Blog';
import ManageCompanies from './components/admin/ManageCompanies';
import Company from './components/admin/Company';
import CompanySetup from './components/admin/CompanySetup';
import BrowseCompanies from './components/BrowseCompanies';
import ManageJobs from './components/admin/ManageJobs';
import SubmitJobs from './components/admin/SubmitJobs';
import ChoosePackage from './components/admin/ChoosePackage';
import Checkout from './components/admin/Checkout';
import Applicants from './components/admin/Applicants';
import BrowseCategories from './components/BrowseCategories';
import ProtectedRoute from './components/admin/ProtectedRoute';
import CompanyDescription from './components/CompanyDescription';
import BrowseCandidates from './components/BrowseCandidate';
import CandidateDescription from './components/CandidateDescription';
import BrowseCandidateHalfMap from './components/BrwoseCandidateHalfMap';
import UpdateJob from './components/admin/updateJob';
import DuplicateJob from './components/admin/DuplicateJob';
import AdminDashboard from './components/AdminDashboard';
// Assuming userRole comes from context or props
const appRouter = createBrowserRouter([
  
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/companydescription/:id',
    element: <CompanyDescription />,
  },
  {
    path: '/candidatedescription/:id',
    element: <CandidateDescription />,
  },
  {
    path: '/browsecategories',
    element: <BrowseCategories />,
  },
  {
    path: '/browsecandidates',
    element: <BrowseCandidates />,
  },
  {
    path: '/browsecandidatehalfmap',
    element: <BrowseCandidateHalfMap />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/messages',
    element: <Messages />,
  },
  {
    path: '/bookmark',
    element: <BookMark />,
  },
  {
    path: '/manageresume',
    element: <ManageResume />,
  },
  {
    path: '/addresume',
    element: <AddResume />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/myapplication',
    element: <MyApplication />,
  },
  {
    path: '/admindashboard',
    element: <AdminDashboard />,
  },

  // Admin specific routes with ProtectedRoute
  {
    path: '/admin/company',
    element: <ProtectedRoute><Company /></ProtectedRoute>,
  },
  {
    path: '/admin/updatejob/:id',
    element: <ProtectedRoute><UpdateJob/></ProtectedRoute>,                               ///updateeeeee
  },
  {
    path: '/admin/duplicatejob/:id',
    element: <ProtectedRoute><DuplicateJob/></ProtectedRoute>,                               ///updateeeeee
  },
  {
    path: '/admin/managecompanies',
    element: <ProtectedRoute><ManageCompanies /></ProtectedRoute>,
  },
  {
    path: '/admin/company/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
  },
  {
    path: '/admin/ManageJobs',
    element: <ProtectedRoute><ManageJobs /></ProtectedRoute>,
  },
  {
    path: '/admin/submitjobs',
    element: <ProtectedRoute><SubmitJobs /></ProtectedRoute>,
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
  },
  {
    path: '/admin/browsecompanies',
    element: <BrowseCompanies />,
  },
  {
    path: '/admin/choosepackage',
    element: <ProtectedRoute><ChoosePackage /></ProtectedRoute>,
  },
  {
    path: '/admin/checkout',
    element: <ProtectedRoute><Checkout /></ProtectedRoute>,
  },
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
