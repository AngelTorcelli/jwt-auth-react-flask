import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../endpoints/endpoints'
import { useAuth } from '../../context/authcontext'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUserRole, loading } = useAuth();
    const [error, setError] = useState('')
    const [viewAlert, setViewAlert] = useState(false)   

    const navigate = useNavigate()

    const loginUser = async (email, password) => {
        const response = await login(email, password)
        console.log(response)

        if (!response.error) {                 
            setUserRole(response.role)
            if (response.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/user')
            }
        }else{
            setError(response.error);
            setViewAlert(true);
            setTimeout(() => {
                setViewAlert(false);
            }, 1000);
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        loginUser(email, password)
    }


    return (
        <section className='form-container'>
            <div className='bg-img'></div>
            <div className='bg-form'>
                <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {viewAlert && <div className='error'>{error}</div>}
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                <small>No tienes cuenta? <Link to="/registro">Registro</Link></small>
                </form>
            </div>
        </section>

    )
}

export default LoginPage