import { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import { WelcomePage } from './WelcomePage/WelcomePage'
import { LoadingPage } from './LoadingPage/LoadingPage'
import { RegisterPage } from './RegisterPage/RegisterPage'
import { LoginPage } from './LoginPage/LoginPage'
import { FinalPage } from './FinalPage/FinalPage'
import { useAuth } from './AuthContext/AuthContext'
import { Verify } from './VerifyToken'




const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth()


  useEffect(() => {

    Verify(isAuthenticated, setIsAuthenticated)
  }, [])

  return (
    <div className="container">
      <LoadingPage />
      <div className="pages">
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path='/' element={<WelcomePage />} />
              <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
          )}

          {isAuthenticated && (
            <>
              <Route path='/final' element={<FinalPage />} />
              <Route path='*' element={<Navigate to='/final' />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
export default App

