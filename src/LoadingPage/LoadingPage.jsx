import { useEffect, useState } from 'react'
import 'animate.css';

import './LoadingPage.css'

export const LoadingPage = () => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <div className={`${isLoading ? 'loading' : 'complete'}`}>
            <img src="./MainLogo.svg" alt="" className="load" />
        </div>
    )
}