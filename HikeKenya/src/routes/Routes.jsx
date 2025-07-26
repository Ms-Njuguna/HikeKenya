import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import LoginSignupPage from '../pages/LoginSignupPage';

const AppRoutes= ({trails, badges, reviews}) => {
    return(
        <Routes>
            <Route path='/' element={<Home initialTrails={trails} reviews={reviews} />}/>
            <Route path='/login-signup' element={<LoginSignupPage />}/>

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard badges={badges} /></ProtectedRoute>}/> 
        </Routes>
    );
};

export default AppRoutes;