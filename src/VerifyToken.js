import axios from "axios";


export const Verify = async (isAuthenticated, setIsAuthenticated) => {
        try {
          
            console.log(localStorage.getItem('jwtToken'))

            const response = await axios.post('https://servermanishr.onrender.com/auth/verify', {
                accessToken: localStorage.getItem('jwtToken')
            })

            if (response.status == 200) {
            
                setIsAuthenticated('true')
            }

        } catch (error) {
            console.log(error)

            setIsAuthenticated(false)

        }

    
}