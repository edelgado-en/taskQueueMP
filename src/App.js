import { useEffect, lazy, Suspense } from 'react';
import './App.css';

import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom';

import Navigation from './routes/navigation/navigation';

const Home = lazy(() => import('./routes/home/home'));
const Counter = lazy(() => import('./features/counter/Counter'));

//if you are in DEV go to /login
const redirectUrl = 'https://github.com';

const isUserAuthenticated = () => {
  return true; //use existing function
}

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

const Login = () => {
  return <div>Login page</div>
}

const Footer = () => {
  return (
    <div className="text-center px-3 py-3 text-xs border-t border-gray-300">
        Copyright &#169; 2003-2021 Demo Corporation. All Rights Reserved. -
         <Link to="/tpmv2/terms-of-use" className="text-blue-700">Terms of Use.</Link> -
         <Link to="/tmv2/privacy-policy" className="text-blue-700">Privacy Policy.</Link>
    </div>
  )
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
                    <Route path="counter" element={<Counter />}/>
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
