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
import { SingleProduct } from './pages/SingleProduct';
import { Search } from './pages/Search';
import { LogIn } from './pages/admin/LogIn';
import { Dashboard } from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { ProductsList } from './pages/admin/products/ProductsList';
import { CreateProduct } from './pages/admin/products/CreateProduct';
import { EditProduct } from './pages/admin/products/EditProduct';
import { CategoriesList } from './pages/admin/categories/CategoriesList';
import { CreateCategory } from './pages/admin/categories/CreateCategory';
import { EditCategory } from './pages/admin/categories/EditCategory';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
        <Route path='/projects/:id' element={<SingleProject />}></Route>
        <Route path='/certificates' element={<Certificates />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/news/:id' element={<SingleNews />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        
        

        <Route element={<PrivateRoute />} >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductsList />} />
            <Route path="/admin/products/create" element={<CreateProduct />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/categories/" element={<CategoriesList />} />
            <Route path="/admin/categories/create" element={<CreateCategory />} />
            <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
          </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
