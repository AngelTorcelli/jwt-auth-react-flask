import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProfile, logout } from '../../endpoints/endpoints'

const PerfilAdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getAdminProfile = async () => {
            try {
                const response = await getProfile('admin')

                setIsAuthenticated(true)
                setMessage(response)
                
            } catch (error) {
                console.error('Error al verificar la autenticación:', error)
                navigate('/login')
            } finally {
                setLoading(false)
            }
        }

        getAdminProfile();
    }, []
)

    const handleLogout = async () => {
        try {
            const response = await logout()
            if (response) {
                setIsAuthenticated(false)
                navigate('/login')
                
            }
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    if (loading) return <div>Loading...</div>
    if (!isAuthenticated) return null

    return (
        <div className='container'>
            <h1>Perfil de Administrador</h1>
            <p>{message}</p>        
            <button className='error' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default PerfilAdminPage
