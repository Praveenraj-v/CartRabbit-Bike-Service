import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { Login } from './components/Login_Page/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './components/Signup_Page/Signup';
import { Namebar } from './components/Namebar/Namebar';
import { CustomerLanding } from './components/Customer_Landing/CustomerLanding'
import { OwnerLandingPage } from './components/Owner_Landing/OwnerLandingPage';
import { AdminLogin } from './components/Login_Page/adminLogin';
import { HomePage } from './components/HomePage/HomePage';

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/Login' element={[<Namebar/>,<Login/>]}/>
        <Route path='/Admin' element={[<Namebar/>,<AdminLogin/>]}/>
        <Route path='/Signup' element={[<Namebar/>,<Signup/>]}/>
        <Route path='/Customer/:customerId' element={[<CustomerLanding/>]}/>
        <Route path='/Owner' element={[<OwnerLandingPage/>]}/>
        <Route path='/' element={[<HomePage/>]}/>
      </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
