import { useEffect, useState } from 'react'
import './InputWithLabel.css'

export const InputWithlabel = (props) => {
    const [labelClass, setLabelClass] = useState('')
    const [inputClass, setInputClass] = useState('')
    const [errorText, setErrorText] = useState('')
    useEffect(() => {
        if (props.error == '' || props.error == undefined) {
            setLabelClass('')
            setInputClass('')
            setErrorText('')
        } else if (props.error == 'emptyError') {
            setLabelClass('labelError')
            setInputClass('inputError')
            setErrorText(<span className='notification'>
                This field should be filled
            </span>)
        } else {
            setLabelClass('labelError')
            setInputClass('inputError')
            setErrorText(<span className='notification'>
                {props.error}
            </span>)
        }
    }, [props.error])

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (props.regexp.test(text)) {
            props.setSomething(text);
        }
    };

    return (

        <div className='InpLab' style={{
            width: `${props.width}`
        }} >
            <label className={labelClass} htmlFor={props.name}>{props.name}</label>
            <input className={inputClass} autoComplete='new-password' type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={handleInputChange} />
            {errorText}
        </div>)
}