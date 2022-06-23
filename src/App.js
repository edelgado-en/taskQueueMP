import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom';
import Navigation from './routes/navigation/navigation';
import { CONTROL_CENTER_LOGIN_URL } from './constants';
import Login from './routes/login/login';
import { isUserAuthenticated } from './localstorage';
import './App.css';
import Footer from './components/footer/footer';

const Home = lazy(() => import('./routes/home/home'));

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
      <Suspense fallback={<Fallback />}>
        {/* You need to have a wrapper here with a content and a footer for the footer to be sticky */}
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
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
