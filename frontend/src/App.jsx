import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Projects } from './pages/Projects'
import { ContactUs } from './pages/ContactUs'
import { AboutUs } from './pages/AboutUs'
import { Certificates } from './pages/Certificates'
import { Header } from './components/Header'

function App() {


  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
        <Route path='/certificates' element={<Certificates />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
