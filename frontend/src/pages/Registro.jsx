import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../endpoints/endpoints'

const RegistroPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('admin')
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
        console.log(email, password, role)
        registrar(email, password, role)
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
                    <input id="email" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input id='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="role">Role</label>
                    <select id="role"onChange={(e) => setRole(e.target.value)}>
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