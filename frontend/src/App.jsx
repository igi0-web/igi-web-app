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
import { ProjectsList } from './pages/admin/projects/ProjectsList';
import { CreateProject } from './pages/admin/projects/CreateProject';
import { EditProject } from './pages/admin/projects/EditProject';
import { CertificatesList } from './pages/admin/certificates/CertificatesList';
import { CreateCertificate } from './pages/admin/certificates/CreateCertificate';
import { CreateEvent } from './pages/admin/events/CreateEvent';
import { EventsList } from './pages/admin/events/EventsList';
import { EditEvent } from './pages/admin/events/EditEvent';
import { AdminsList } from './pages/admin/admins/AdminsList';
import { CreateAdmin } from './pages/admin/admins/CreateAdmin';
import { EditAdmin } from './pages/admin/admins/EditAdmin';

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
            <Route path="/admin/projects/" element={<ProjectsList />} />
            <Route path="/admin/projects/create" element={<CreateProject />} />
            <Route path="/admin/projects/edit/:id" element={<EditProject />} />
            <Route path="/admin/certificates/" element={<CertificatesList />} />
            <Route path="/admin/certificates/create" element={<CreateCertificate />} />
            <Route path="/admin/events/" element={<EventsList />} />
            <Route path="/admin/events/create" element={<CreateEvent />} />
            <Route path="/admin/events/edit/:id" element={<EditEvent />} />
            <Route path="/admin/admins/" element={<AdminsList />} />
            <Route path="/admin/admins/create" element={<CreateAdmin />} />
            <Route path="/admin/edit-my-profile" element={<EditAdmin />} />

          </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
