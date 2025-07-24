import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import LoginSignupPage from '../pages/LoginSignupPage';
import Payment from '../pages/Payment'

const AppRoutes= ({trails, users, badges, reviews}) => {
    return(
        <Routes>
            <Route path='/' element={<Home trails={trails} reviews={reviews}/>}/>
            <Route path='/login-signup' element={<LoginSignupPage />}/>

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard badges={badges} users={users}/></ProtectedRoute>}/> 
            <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
        </Routes>
    );
};

export default AppRoutes;