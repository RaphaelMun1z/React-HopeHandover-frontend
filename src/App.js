import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"
import Modal from 'react-modal';

import NavBar from './components/layout/Navbar/NavBar'
import Footer from './components/layout/Footer/Footer'
import Routes from './Routes/Routes'
import Container from './components/layout/Container/Container';

Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <Container customClass="min-height" >
        <NavBar />
        <Routes />
        <Footer />
      </Container>
      <ToastContainer />
    </Router>
  )
}

export default App;
