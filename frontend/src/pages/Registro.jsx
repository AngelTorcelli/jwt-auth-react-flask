import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../endpoints/endpoints'

const RegistroPage = () => {
    const [form, setForm] = useState({email: '', password: '', role: 'admin'})
    const [viewAlert, setViewAlert] = useState(false)   
    const [alert, setAlert] = useState('')
    const [error, setError] = useState('')

    const registrar = async (email, password, role) => {
        
        const response = await register(email, password, role)

        if(!response.error){
            setAlert(response.message)
            setViewAlert(true);
            setTimeout(() => {
                setViewAlert(false);
                setAlert('')
            }, 1000);
        }else{
            setError(response.error)
            setViewAlert(true);
            setTimeout(() => {
                setViewAlert(false);
                setError('')
            }, 1000);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        registrar(form.email, form.password, form.role)
    }

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
    }


  return (
    <section className='form-container'>
        <div className="bg-img"></div>
        <div className="bg-form">
            <form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                {viewAlert && error &&  <div className='error'>{error}</div>}
                {viewAlert && alert && <div className='alert'>{alert}</div>}
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" placeholder="email" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input id='password' name="password" type="password" placeholder="Password" onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit">Register</button>
                <small>Ya tienes cuenta? <Link to="/login">Login</Link></small>
            </form>            
        </div>
    </section>

  )
}

export default RegistroPage