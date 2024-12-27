import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Index from './componentes/Index'
import SignIn from './componentes/Signin';
import SignUp from './componentes/SignUp';
import NewsPage from './componentes/NewsPage';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/newspage" element={<NewsPage/>} />
      

      </Routes>

      <ToastContainer 
        position="top-center" 
        autoClose={2000}     
        hideProgressBar={false} 
        newestOnTop={false}  
        closeOnClick={true}  
        rtl={false}          
        pauseOnFocusLoss={false} 
        draggable
        pauseOnHover 
      />

      

    </Router>   
  );
}

export default App