import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegistroPage from './pages/Registro'
import PerfilAdminPage from './pages/PerfilAdmin'
import PerfilUserPage from './pages/PerfilUser'
import ProtectedRouteAdministrador from './components/RouteProtection/ProtectedRouteAdministrador'
import ProtectedRouteUsuario from './components/RouteProtection/ProtectedRouteUsuario'
import { AuthProvider } from '../context/authcontext'

function App() {


  return (
    <main>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas No Protegidas */}
            <Route path='/registro' Component={RegistroPage} />
            <Route path='/login' Component={LoginPage} />

            {/* Rutas Protegidas */}
            <Route element={<ProtectedRouteAdministrador />}>
              <Route path='/admin' Component={PerfilAdminPage} />
            </Route>
            <Route element={<ProtectedRouteUsuario />}>
              <Route path='/user' Component={PerfilUserPage} />
            </Route>
            <Route path='*' Component={LoginPage} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </main>
  )
}

export default App
