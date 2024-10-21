
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminPanel from './admin/AdminPanel'
import Home from './pages/Home';
import AboutPage from './pages/About';
import ProfilePage from './pages/Profile';
import Campaign from './pages/Campaign';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path='/admin' element={<AdminPanel/>}/>
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path='/profile' element={<ProfilePage/>}/>

          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/campaign/:id' element={<Campaign/>}/>

          
          

          


          {/* Other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
