import React from 'react'
import HomeScreen from './pages/home/HomeScreen'
import './App.css';
import Login from './pages/login/Login';
import { Route, Routes } from 'react-router-dom';
import Reflectedxss from './pages/reflectedxss/Reflectedxss';
import Sotredxss from './pages/storedxss/Storedxss';
import Movies from './pages/movies/Movies';
import ResetPassword from './pages/resetpassword/ResetPassword';
import Layout from './layout/Layout';
const App = ({children}) => {
  return (
    <Routes>
      <Route path='/' element={<Layout><HomeScreen /></Layout>}/>
      <Route path='/login' element={<Layout><Login /></Layout>}/>
      <Route path='/reflectedxss' element={<Layout><Reflectedxss /></Layout>}/>
      <Route path='/storedxss' element={<Layout><Sotredxss /></Layout>}/>
      <Route path='/movies' element={<Layout><Movies /></Layout>}/>
      <Route path='/reset-password' element={<Layout><ResetPassword /></Layout>}/>
    </Routes>
  )
}

export default App