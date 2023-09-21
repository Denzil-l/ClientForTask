import { useEffect, useState } from 'react'
import './HoneyPotInput.css'

export const HoneyPotInput = (props) => {



    const names = [
        "firstName",
        "lastName",
        "email",
        "username",
        "password",
        "confirmPassword",
        "address",
        "city",
        "state",
        "zipCode",
        "phone",
        "dateOfBirth",
        "gender",
        "country",
        "occupation",
        "company",
        "website",
        "bio",
        "interests",
        "newsletterSubscribe"
    ]
    const [top, setTop] = useState(-Math.floor(Math.random() * 100) - 100)
    const [left, setLeft] = useState(-Math.floor(Math.random() * 100) - 100)
    const [id, setId] = useState(Math.floor(Math.random() * 100))
    const [name, setName] = useState(names[Math.floor(Math.random() * 19)] + id)


    const handleInputChange = (e) => props.setSomething(e.target.value)


    return (
        <div className='special' style={{
            top: `${top}%`,
            left: `${left}%`
        }}>
            <label htmlFor={name}>{name}</label>
            <input autoComplete='new-password' type={props.type} name={name} value={props.value} onChange={handleInputChange} />

        </div>
    )
}