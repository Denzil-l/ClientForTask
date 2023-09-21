import { useNavigate } from "react-router-dom"


export const BackButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    return (
        <>
            <button className="back" onClick={handleClick}>
                <img src="./arrow-right.svg" alt="" />
            </button>
        </>
    )
}