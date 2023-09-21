import ReCAPTCHA from "react-google-recaptcha";
import './RecaptchaWindow.css'
import React from "react";
export const RecaptchaWindow = ({ styles, setCaptchaToken, setTryCount }) => {
    const captchaRef = React.createRef()
    const onCaptchaSubmit = (response) => {
        setCaptchaToken(response)
        setTryCount(0)
        captchaRef.current.reset()
    }
    const onCaptchaExpired = () => {
        console.log("Срок действия CAPTCHA истек");
    }
    const onCaptchaError = () => {
        console.log("Произошла ошибка при загрузке CAPTCHA");
    }
    return (
        <div className="Captcha" style={{
            display: styles
        }}>
            <h1>Please complete the ReCaptcha</h1>
            <ReCAPTCHA ref={captchaRef} sitekey="6LeXYUMoAAAAANVviQcm4_3r7MaAnhxfQDsY37Y8" theme="dark" size="normal" onChange={onCaptchaSubmit} onExpired={onCaptchaExpired} onErrored={onCaptchaError} />
        </div>
    )
}