import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer';

import './layout.css';

const Layout = ({children}) => {
    const session = null;
    return (
    <div className='layout'>
        <Navbar session={session}/>
        <div className='content'>{children}</div>
        <Footer />
    </div>
  )
}

export default Layout