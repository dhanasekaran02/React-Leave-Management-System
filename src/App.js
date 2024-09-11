import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from "react-router-dom";
import { createContext } from 'react';
import Layout from './layouts/route-layouts/Layout'
import Employee from './routes/Employee';
import Manager from './routes/Manager';
import Hr from './routes/Hr';
import Admin from './routes/Admin';

export const userContext = createContext();

function App() {
  const user="DHANASEKARAN B";
  return (
    <div className="App">
      {/* Different users login navigation */}
        <Routes>
            <Route path="/" element={<LoginPage/>}/> 
            <Route path='/employee/*' element={<Layout><Employee/></Layout>}/>
            <Route path='/manager/*' element={<Layout><Manager/></Layout>}/>
            <Route path='/hr/*' element={<Layout><Hr/></Layout>}/>
            <Route path='/admin/*' element={<Layout><Admin/></Layout>}/>
        </Routes>
    </div>
  );
}

export default App;
