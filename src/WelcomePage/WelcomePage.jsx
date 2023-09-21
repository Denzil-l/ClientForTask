import { useEffect } from 'react';
import './WelcomePage.css'
import { useNavigate } from 'react-router-dom'
import { Verify } from '../VerifyToken'
import { useAuth } from '../AuthContext/AuthContext'


export const WelcomePage = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth()


    useEffect(() => {

        Verify(isAuthenticated, setIsAuthenticated)
        console.log('я срабатываю только при первом рендере в app.jsx')
    }, [])

    const navigate = useNavigate();

    return (
        <>
            <div className="logo">
                <img className='logo1' src="./MainLogo.svg" alt="logoPicture" />
                <img className='logo2' src="./MainLogoText.svg" alt="logoText" />
            </div>
            <div className="buttons">
                <button className="register" onClick={() => navigate('/register')}>הרשמה</button>
                <button className="login" onClick={() => navigate('/login')}>יש לי כבר חשבון</button>
            </div>

        </>
    )
}