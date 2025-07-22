import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Payment from '../pages/Payment'

const AppRoutes= () => {
    return(
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>

            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/> 
            <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
        </Routes>
    );
};

export default AppRoutes;