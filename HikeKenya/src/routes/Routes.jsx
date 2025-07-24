import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Payment from '../pages/Payment'

const AppRoutes= ({trails, users, badges, reviews}) => {
    return(
        <Routes>
            <Route path='/' element={<Home trails={trails} reviews={reviews}/>}/>
            <Route path='/login' element={<Login users={users}/>}/>
            <Route path='/signup' element={<Signup users={users}/>}/>

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard badges={badges} users={users}/></ProtectedRoute>}/> 
            <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
        </Routes>
    );
};

export default AppRoutes;