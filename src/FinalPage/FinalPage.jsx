import { Verify } from '../VerifyToken'
import { useAuth } from '../AuthContext/AuthContext'
import { useEffect } from 'react'
export const FinalPage = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth()


    useEffect(() => {

        Verify(isAuthenticated, setIsAuthenticated)
    }, [])
    const handleLogout = async () => {
        localStorage.removeItem('jwtToken');
        Verify(isAuthenticated, setIsAuthenticated)
    }
    return (
        <div className="final-page">
            <h1 className="title"></h1>
            <p className="subtitle"></p>

            <div className="logo">
                <img className='logo1' src="./MainLogo.svg" alt="logoPicture" />
                <img className='logo2' src="./MainLogoText.svg" alt="logoText" />
            </div>


            <button className="register logout" onClick={handleLogout}>להתנתק</button>
        </div>
    )
}