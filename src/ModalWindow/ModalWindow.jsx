import { useNavigate } from "react-router-dom"
import './ModalWindow.css'
export const ModalWindow = ({ text, styles }) => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className="modalWindow" style={{
            display: styles
        }}>
            <h2>{text}</h2>
            <button className='register form-button' onClick={handleClick}>אישור</button>

        </div>
    )
}