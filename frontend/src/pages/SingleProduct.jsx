import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
export const SingleProduct = () => {

    let catName;
    const params = useParams();
    const [product, setProduct] = useState({});
    if (Object.values(product).length != 0) {
        catName = product.category.name;

        console.log(catName);
    }



    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {

                const res = await fetch(`https://igi-web-app.onrender.com/api/products/${params.id}`);
                const data = await res.json();
                if (data.success === false) {

                    return;
                }
                setProduct(data);
                console.log(data);

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchSingleProduct();

    }, [params.id]);
    if (Object.values(product).length === 0) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }
    return (
        <>

            <Container  className="p-4 section-p my-5">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
                        
                        <img
                            src={`${product.imageUrl}`}
                            alt={product.name}
                            fluid
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            className="product-image rounded"
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Accordion alwaysOpen={"true"} defaultActiveKey="0" >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header >{product.name}</Accordion.Header>
                                <Accordion.Body>

                                    <Card.Subtitle  as="h6" className="mb-2 text-muted">
                                        Code: {product.code}
                                    </Card.Subtitle>
                                    <Card.Subtitle as="h6" className="mb-2 text-muted">
                                        Category: {catName}
                                    </Card.Subtitle>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Description</Accordion.Header>
                                <Accordion.Body>
                                    <Card.Text className='text-secondary'>{product.description}</Card.Text>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Features</Accordion.Header>
                                <Accordion.Body>
                                    <Card.Text className='text-secondary'>{product.features}</Card.Text>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
                <div class="row mt-3">
                    <div class="col-12">
                        <a href="/products" class=" btn desiredBtn w-100">Other Products</a>
                    </div>

                </div>
            </Container>
            
                
          

        </>
    )
}
