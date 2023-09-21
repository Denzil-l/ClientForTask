import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { HoneyPotInput } from '../HoneyPotInput/HoneyPotInput'
import { RecaptchaWindow } from '../RecaptchaWindow/RecaptchaWindow'
import React from 'react'

import { Verify } from '../VerifyToken.js'
import { useAuth } from '../AuthContext/AuthContext'
export const LoginPage = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth()


    useEffect(() => {

        Verify(isAuthenticated, setIsAuthenticated)
    }, [])


    const navigate = useNavigate()
    const inputRef = useRef(null)
    const captchaRef = React.createRef()
    // const captchaRef = useRef(null)
    const [inputValue, setInputValue] = useState('')
    const [honeyPot, setHoneyPot] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')
    const [blockSubmiting, setBlockSubmiting] = useState(false)
    const [notification, setNotification] = useState(['', 'none'])
    const [customStyle, setCustomStyle] = useState('beautiful-block')
    const [digits, setDigits] = useState(['', '', '', '', '', '', '', '', '', ''])
    const [captchaWindow, setCaptchaWindow] = useState('none');

    const [tryCount, setTryCount] = useState(0)

    const handleChange = (e) => {
        if (/^[0-9]{0,10}$/.test(e.target.value)) {
            setInputValue(e.target.value)
            const text = e.target.value.split('')
            const array = []
            for (let i = 0; i < 10; i++) {
                if (text[i]) {
                    array.push(text[i])
                } else {
                    array.push['']
                }

            }
            setDigits(array)
        }
    }
    const handleBlur = () => {
        setCustomStyle('beautiful-block')
    };
    const ReftoInput = () => {
        setCustomStyle('beautiful-block active')
        inputRef.current.focus()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!blockSubmiting) {
            setBlockSubmiting(true)
            if (/^[0-9]{10}$/.test(digits.join(''))) {
                if (/^05\d{8}$/.test(digits.join(''))) {
                    if (tryCount < 2) {
                        try {
                            const response = await axios.post('https://servermanishr.onrender.com/auth/login', {
                                honeyPot: honeyPot,
                                phone_number: inputValue,
                                captchaToken: captchaToken
                            })
                            if (response.status === 200 && response.data.message === 'welcome') {
                                setBlockSubmiting(false)
                                navigate('/')
                            } else if (response.status === 200 && response.data.message === 'you loged in') {
                                localStorage.setItem('jwtToken', response.data.token)
                                setIsAuthenticated(true)
                                setBlockSubmiting(false)
                                navigate('/final')
                            }

                        } catch (error) {
                            console.log(error)
                            if (error.response.status === 400) {
                                setTryCount(tryCount + 1)
                                setCaptchaToken('')
                                setNotification(['משתמש לא קיים', 'block'])
                                setBlockSubmiting(false)

                            }
                        }
                    } else {
                        setCaptchaWindow('flex')
                        setBlockSubmiting(false)

                    }





                } else {
                    setTryCount(tryCount + 1)
                    setBlockSubmiting(false)

                    setNotification(['המספר שלך חייב להתחיל ב-05', 'block'])
                }
            } else {
                setTryCount(tryCount + 1)
                setBlockSubmiting(false)

                setNotification(['יש למלא את השדה הזה', 'block'])
            }
        }




    }


    useEffect(() => {
        setCaptchaWindow('none')
    }, [captchaToken])



    return (
        <div className="login-page">
            <img onClick={() => navigate('/')} src="./dountLogo.svg" alt="" className="logo-big" />
            <form className='login-form'>
                <HoneyPotInput type={'text'} value={honeyPot} setSomething={setHoneyPot} />
                <label className='login-label' htmlFor="phone_number">הכניס/י את מס׳ הטלפון שלך</label>
                <div className={customStyle} onClick={ReftoInput}>
                    <div className="custom-input">
                        <div className="cell">{digits[0]}</div>
                        <div className="cell">{digits[1]}</div>
                        <div className="cell">{digits[2]}</div>
                        <div className="x"></div>
                        <div className="cell">{digits[3]}</div>
                        <div className="cell">{digits[4]}</div>
                        <div className="cell">{digits[5]}</div>
                        <div className="cell">{digits[6]}</div>
                        <div className="cell">{digits[7]}</div>
                        <div className="cell">{digits[8]}</div>
                        <div className="cell">{digits[9]}</div>
                    </div>

                    <input autoComplete='new-password' ref={inputRef} className='login-input' name='phone_number' type="text" maxLength='10' onChange={handleChange} onBlur={handleBlur}
                    />
                </div>
                <span className="notification login-notification" style={{
                    display: `${notification[1]}`
                }} >{notification[0]}</span>
                <button className='register login-button' onClick={handleSubmit} >אישור</button>
            </form>
            <RecaptchaWindow setCaptchaToken={setCaptchaToken} setTryCount={setTryCount} styles={captchaWindow} />

        </div>
    )
}