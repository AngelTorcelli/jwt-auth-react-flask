import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../endpoints/endpoints'
import { useAuth } from '../../context/authcontext'

const LoginPage = () => {
    const [form, setForm] = useState({email: '', password: ''})    
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
        console.log(form)
        loginUser(form.email, form.password)
    }

    const handleChange = (e) => {
        //console.log(e.target.name, e.target.value)
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
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
                    <input id="email" name='email' type="text" placeholder="Username" onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input id="password" name='password' type="password" placeholder="Password" onChange={handleChange}/>
                </div>
                <button type="submit">Login</button>
                <small>No tienes cuenta? <Link to="/registro">Registro</Link></small>
                </form>
            </div>
        </section>

    )
}

export default LoginPage