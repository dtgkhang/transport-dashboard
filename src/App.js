import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from './components/ProtectedRoute'
import Home from './page/Home'
import React  from 'react';
import Login from "./page/login/login";
import Loader from "./components/Loader";
import {useSelector} from "react-redux";
import CompanyDashboard from "./page/Company/CompanyDashboard";
import CompanyTrip from "./page/Company/CompanyTrip";
import CompanyVehicle from "./page/Company/CompanyVehicle";
import CompanyBooking from "./page/Company/CompanyBooking";
import AdminCompany from "./page/Admin/AdminCompany";
import LogOut from "./components/LogOut";
import AdminUser from './page/Admin/AdminUser';
import AdminVouncher from './page/Admin/AdminVouncher';
import CompanyVoucher from './page/Company/CompanyVoucher';
import AdminDashboard from './page/Admin/AdminDashboard';

function App() {
    const {loading} =useSelector(state => state.alerts)
  return (
    <div className="App">
        {loading&& <Loader/>}
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="/logout" element={<ProtectedRoute><LogOut/></ProtectedRoute>}/>

            <Route path="/company" element={<ProtectedRoute><CompanyDashboard/></ProtectedRoute>}/>
            <Route path="/company/trip" element={<ProtectedRoute><CompanyTrip/></ProtectedRoute>}/>
            <Route path="/company/vehicle" element={<ProtectedRoute><CompanyVehicle/></ProtectedRoute>}/>
            <Route path="/company/booking" element={<ProtectedRoute><CompanyBooking/></ProtectedRoute>}/>
            <Route path="/company/voucher" element={<ProtectedRoute><CompanyVoucher/></ProtectedRoute>}/>
            <Route path="/company/dashboard" element={<ProtectedRoute><CompanyDashboard/></ProtectedRoute>}/>

            <Route path="/admin" element={<ProtectedRoute><AdminCompany/></ProtectedRoute>}/>
            <Route path="/admin/voucher" element={<ProtectedRoute><AdminVouncher/></ProtectedRoute>}/>
            <Route path="/admin/company" element={<ProtectedRoute><AdminCompany/></ProtectedRoute>}/>
            <Route path="/admin/user" element={<ProtectedRoute><AdminUser/></ProtectedRoute>}/>
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
