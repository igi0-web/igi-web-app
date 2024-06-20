import { useNavigate } from "react-router-dom";
import backImage from "../assets/pages/products/background.jpg"
import React, { useEffect, useState } from 'react'
import { ProductCard } from "../components/ProductCard";

import { Row, Col } from "react-bootstrap"



export const Search = () => {

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
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
                    return;
                }
                setProducts(data);

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProducts();
    }, [window.location.search])
    console.log(products);
    console.log(query);
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
