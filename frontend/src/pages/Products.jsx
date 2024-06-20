import backImage from "../assets/pages/products/background.jpg"
import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap"
import { ProductCard } from "../components/ProductCard"
import { Filter } from "../components/Filter"
import { motion, AnimatePresence } from "framer-motion"
export const Products = () => {

  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState(0);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {

        const res = await fetch(`/api/products/`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchAllCats = async () => {
      try {

        const res = await fetch(`/api/products/categories/`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setCats(data);

      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAllProducts();
    fetchAllCats();
  }, []);

  return (
    <>
      <div className='d-flex align-items-center justify-content-center text-light' style={{
        backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
        backgroundPosition: 'top', backgroundRepeat: 'no-repeat', height: "300px"
      }}>
        <h1 className="fw-bold">PRODUCTS</h1>
      </div>

      <section className='container my-5'>
        <Filter allProductsArr={products} setFiltered={setFiltered} activeCat={activeCat} setActiveCat={setActiveCat} categories={cats} />
        <motion.section layout>
          <Row className="my-3">
            <AnimatePresence>
              {
                filtered.map((prod) => {
                  return (
                    <Col className="mb-3" key={prod._id} sm={12} md={6} lg={7} xl={4}>
                      <ProductCard
                        {...prod}
                      />
                    </Col>
                  )
                })
              }
            </AnimatePresence>
          </Row>

        </motion.section>

      </section>
    </>
  )
}
