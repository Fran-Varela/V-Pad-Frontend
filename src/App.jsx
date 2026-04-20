import { useEffect, useState } from 'react'
import './styles/App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Carta from './pages/Carta'
import Pedir from './pages/Pedir'
import PedirAqui from './pages/PedirAqui'
import PedirADomicilio from './pages/PedirADomicilio'
import Admin from './pages/Admin'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Footer from './components/footer'

const getRouteComponent = (path) => {
  const routes = {
    '/': <Home />,
    '/carta': <Carta />,
    '/pedir': <Pedir />,
    '/pedir/aqui': <PedirAqui />, // New sub-route
    '/pedir/adomicilio': <PedirADomicilio />, // New sub-route
    '/admin': <Admin />,
    '/nosotros': <Nosotros />,
    '/contacto': <Contacto />,
  }
  return routes[path] ?? <Home />
}

const normalizePath = (path) => {
  const clean = path.replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

const getLocationValue = () => {
  const pathname = normalizePath(window.location.pathname)
  return `${pathname}${window.location.search}`
}

function App() {
  const [locationValue, setLocationValue] = useState(getLocationValue())

  useEffect(() => {
    const onLocationChange = () => {
      setLocationValue(getLocationValue())
    }

    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  const routePath = locationValue.split('?')[0]

  const hiddenNavbarRoutes = ['/pedir/aqui', '/pedir/adomicilio'];
  const showNavbar = !hiddenNavbarRoutes.includes(routePath);

  return (
    <div className="app-wrapper">
      {showNavbar && <NavBar />}
      <main className="page-content">
        {getRouteComponent(routePath)}
      </main>
      <Footer />
    </div>
  )
}

export default App
