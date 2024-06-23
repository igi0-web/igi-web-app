import React, { useEffect, useState } from 'react'
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faHammer, faPerson, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { AboutCompany } from '../components/AboutCompany';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
SwiperCore.use([Pagination, Autoplay]);
import { ProductCard } from '../components/ProductCard';
import { AboutUsLeft } from '../components/AboutUsLeft';
import certImage from "../assets/pages/home/certificate.jpg"
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

export const Home = () => {

  const [statusCode, setStatusCode] = useState("");
  // State to track the current index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -50, transition: { duration: 1 } }
  };

  // Function to handle slide change
  const handleSlideChange = (selectedIndex) => {
    setCurrentSlide(selectedIndex);
  };


  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    const fetch6Products = async () => {
      try {
        const res = await fetch(`/api/products/six`);
        const data = await res.json();
        if (data.success === false) {
          setStatusCode(data.statusCode);
          console.log(data.message);
          return;
        }
        setProducts(data);

      } catch (error) {
        console.log(error.message);
      }
    }


    const fetch3Projects = async () => {
      try {

        const res = await fetch(`/api/projects/three`);
        const data = await res.json();
        if (data.success === false) {
          setStatusCode(data.statusCode);
          console.log(data.message);
          return;
        }
        setProjects(data);
        fetch6Products();
      } catch (error) {
        console.log(error.message);
      }
    }
    fetch3Projects();
  }, [])

 

  if ((products.length === 0 || projects.length === 0 || loading == true) && statusCode != 404) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Loader />
        </div>
    );
}


  return (
    <>
      <section id='carousel-section'>
      <Carousel 
        touch={true} 
        controls={false} 
        pause={false} 
        className="mb-4 container-fluid d-flex align-items-center justify-content-center p-0" 
        onSelect={handleSlideChange}  // Hook to detect slide change
      >
        {projects.map((project, index) => (
          <Carousel.Item key={project._id} interval={3000}>
            <Link to={`/projects/${project._id}`} className='text-decoration-none'>
              <div className='d-flex flex-column align-items-center justify-content-center text-light' style={{
                backgroundImage: `url(${project.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                height: "100vh",
                width: "100%"
              }}>
                <Carousel.Caption className="carousel-caption">
                  <motion.h1
                    initial="hidden"
                    animate={index === currentSlide ? "visible" : "hidden"}  // Only animate the current slide
                    exit="exit"
                    variants={animationVariants}
                    key={project._id}  // Unique key to trigger re-render
                  >
                    {project.title}
                  </motion.h1>
                </Carousel.Caption>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>


      <section class="container px-3 p-lg-3 whiteBackground my-5" id="aboutUsSection">

        <h2 class="section-heading text-center mb-5">Who We Are</h2>

        <div class="row g-4">

          <AboutCompany icon={faHammer} h2={"We Build Air Movement Products"} p={"From the smallest HVAC products to the largest ones"} />

          <AboutCompany icon={faPerson} h2={"Each Customer is Number One"} p={"We are working hard to reach customer satisfaction"} />

          <AboutCompany icon={faCalendarDays} h2={"We're Old in the Industry"} p={"Manufacturer of air movement products since 2000"} />


        </div>

      </section>

      <hr className="container mb-3"></hr>

      <section className='container '>
        <h2 class="section-heading text-center">Featured Products</h2>
        <Swiper className='pt-1 pb-5' autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}


          spaceBetween={50}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },

          }}
          loop={true}
          pagination={{ clickable: true }}
        >
          {products.map((prod) => {
            return (
              <SwiperSlide><ProductCard {...prod} /></SwiperSlide>
            )
          })}



        </Swiper>
      </section>

      <hr className="container mb-3"></hr>
      <section className='container'>
        <AboutUsLeft paragraph="Yes, with over 37 years of experience, IGI has equipped itself as a trusted
                        name in
                        the industry, committed to delivering top - quality products and unparalleled customer service." title="We Are Certified" imgSrc={certImage} />
        <div class="row mt-3">
          <div class="col-12">
            <a href="/certificates" class=" btn desiredBtn w-100">Check Certificates</a>
          </div>

        </div>
      </section>


    </>


  )
}
