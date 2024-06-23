import { useNavigate } from "react-router-dom";
import backImage from "../assets/pages/products/background.jpg"
import React, { useEffect, useState } from 'react'
import { ProductCard } from "../components/ProductCard";

import { Row, Col } from "react-bootstrap"
import Loader from "../components/Loader";



export const Search = () => {

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [flag, setFlag] = useState(0);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('queryTerm');
        setQuery(searchTermFromUrl);
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/products/search?queryTerm=${searchTermFromUrl}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    setFlag(1);
                    return;
                }
                setProducts(data);
                setFlag(1);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProducts();
    }, [window.location.search])
    

    if (flag == 0) {
        return (
          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <Loader />
          </div>
        );
      }


    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center text-light' style={{
                backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
                backgroundPosition: 'top', backgroundRepeat: 'no-repeat', height: "300px"
            }}>
                {products.length > 0 && <h1 className="fw-bold text-center">Search Results for "{query}" </h1>}
                {products.length === 0 && <h1 className="fw-bold text-center">No products found!</h1>}
            </div>

            <section className='container my-5'>

                <Row>

                    {
                        products.map((prod) => {
                            return (
                                <Col className="mb-3" key={prod._id} sm={12} md={6} lg={7} xl={4}>
                                    <ProductCard
                                        {...prod}
                                    />
                                </Col>
                            )
                        })
                    }

                </Row>

            </section>


        </>
    )
}
