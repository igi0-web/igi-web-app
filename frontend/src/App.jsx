import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Projects } from './pages/Projects'
import { ContactUs } from './pages/ContactUs'
import { AboutUs } from './pages/AboutUs'
import { Certificates } from './pages/Certificates'
import { Header } from './components/Header'
import { News } from './pages/News';
import { Footer } from './components/Footer';
import { SingleNews } from './pages/SingleNews';
import { SingleProject } from './pages/SingleProject';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
        <Route path='/projects/:id' element={<SingleProject />}></Route>
        <Route path='/certificates' element={<Certificates />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/news/:id' element={<SingleNews />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
