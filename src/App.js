import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom';
import Navigation from './routes/navigation/navigation';
import { CONTROL_CENTER_LOGIN_URL } from './constants';
import Login from './routes/login/login';
import { isUserAuthenticated } from './localstorage';
import './App.css';
import Footer from './components/footer/footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./routes/home/home'));
const Dashboard = lazy(() => import('./routes/dashboard/Dashboard'));
const JobApiDashboard = lazy(() => import('./routes/jobApi/JobApiDashboard'));

const redirectUrl = process.env.NODE_ENV === 'production' ? CONTROL_CENTER_LOGIN_URL : '/#/login';

const Redirect = () => {
  useEffect(() => {
    window.location = redirectUrl;
  }, []); 


  return <h5>Redirecting...</h5>
}

const ProtectedRoute = () => {
  if (!isUserAuthenticated()) {
    return <Redirect />
  }

  return <Outlet />
}

const Fallback = () => {
  return <div></div>
}

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
    {/* TODO: add session timeout modal window functionality */}
      <Suspense fallback={<Fallback />}>
        <ToastContainer autoClose={2000} />
        {/* You need to have a wrapper here with a content and a footer for the footer to be sticky */}
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              {/* ### TODO: WRAP THIS IN DEV  */}
              <Route path="/login" element={<Login />} />
              {/* ######################## */}
              
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/job-api" element={<JobApiDashboard />} />
                </Route>
              </Route>
            
            </Routes>
          </div>
          { pathname !== '/login' && <Footer /> } 
        </div>
      </Suspense>
    </>
  );
}

export default App;
