import backImage from "../assets/pages/products/background.jpg"
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from "react-bootstrap"
import { ProductCard } from "../components/ProductCard"
import { Filter } from "../components/Filter"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

export const Products = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)


  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await fetch(`/api/products/`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }
      setProducts(data);
      setFiltered(data);
    } catch (error) {
      setLoading(false)
      setError("Failed to fetch products!" + error.message);
    }
  }



  const fetchAllCats = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await fetch(`/api/products/categories/`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }
      setCats(data);

    } catch (error) {
      setLoading(false)
      setError("Failed to fetch categories!" + error.message);
    }
  }

  useEffect(() => {


    fetchAllProducts();
    fetchAllCats();
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('queryTerm', searchQuery);
      const query = urlParams.toString();
      navigate(`/search?${query}`);
    } else {
      alert("You should enter a product code first!");
      navigate("/products");
    }
    
  }


  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center text-light' style={{
        backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
        backgroundPosition: 'top', backgroundRepeat: 'no-repeat', height: "300px"
      }}>
        <h1 className="fw-bold">PRODUCTS</h1>


        <Form onSubmit={handleSubmit} className="d-flex flex-wrap  justify-content-center gap-2">
          <Form.Control onChange={handleChange} value={searchQuery} style={{ width: "75%" }} autocomplete='off' type="text" name="search" placeholder="Search products by CODE..." className=" py-2 " ></Form.Control>
          <Button type="submit" variant="light" className="px-3 py-1 section-p ">Search</Button>
        </Form>

      </div>

      <section className='container my-5'>
      {error && <p className="text-danger text-center">{error}</p>}
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
        {
          loading == true && <Loader />
        }
      </section>
    </>
  )
}
