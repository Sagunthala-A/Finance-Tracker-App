import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/pages/Signup';
import Dashboard from './Components/pages/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
