import React from 'react'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Footer from './Components/Footer'
import Dashboard from './Pages/OverView'
import Overview from './Pages/OverView'
import Icients from './Pages/Incient'
import { Route, Routes } from 'react-router-dom'
import Settings from './Pages/Settings'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Dashboards from './Pages/Dashboad'


const App = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Routes>
        <Route path='/' element={<Overview/>}/>
        <Route path='/overview' element={<Overview/>}/>
        <Route path='/incidents' element={<Icients/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path="/web-dashboard" element={<Dashboards/>}/>
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default App