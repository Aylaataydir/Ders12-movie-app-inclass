import React from 'react'
import Register from "../src/pages/Register"
import { ToastContainer } from "react-toastify";
import AuthContext from './context/AuthContext';
import AppRouter from "./router/AppRouter"
import MovieContext from './context/MovieContext';


const App = () => {
  return (
    <div className='dark:bg-[#23242a]'>
      <AuthContext>
        <MovieContext>
          <AppRouter />
          <ToastContainer />
        </MovieContext>

      </AuthContext>
    </div>
  );
}

export default App