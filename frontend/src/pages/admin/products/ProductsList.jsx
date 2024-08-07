import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { deleteImageFromFirebase } from '../adminUtils/aUtils';



export const ProductsList = () => {


    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })



    const [statusCode, setStatusCode] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [products, setProducts] = useState([]);
    const [showMore, setShowMore] = useState(false);



    const fetchAllProducts = async () => {
        try {

            setShowMore(false);

            const res = await fetch(`https://igi-web-app.onrender.com/api/products?limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message)
                setStatusCode(data.statusCode);
                return;
            }

            if (data.length > 6) {

                const firstSixElements = data.slice(0, 6);
                setProducts(firstSixElements);
                setShowMore(true);

            } else {

                setProducts(data);
                setShowMore(false);

            }


        } catch (error) {
            setError("Failed to fetch products.");
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllProducts();
    }, [])

    const deleteProduct = async (id) => {

        try {

            const res = await fetch(`https://igi-web-app.onrender.com/api/products/delete/${id}/${currentAdmin._id}`, {
                method: "DELETE",
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setStatusCode(data.statusCode)
                if (data.statusCode == 401) {
                    navigate("/login")
                }
                return;
            }
            setServerMsg("Successfully deleted the product!")
        } catch (error) {

            setError(error.message);
        }

    }

    const fetchProductDetails = async (id) => {
        try {
            const res = await fetch(`https://igi-web-app.onrender.com/api/products/${id}`);
            const product = await res.json();
            if (product.success === false) {
                setStatusCode(product.statusCode)
                setError(product.message);
                return;
            }
            return product.imageUrl;
        } catch (error) {
            console.error("Error fetching product details:", error);
            throw error;
        }
    };


    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this product?")) {
            try {
                setLoading(true)
                const imageUrl = await fetchProductDetails(id);
                await deleteImageFromFirebase(imageUrl)
                await deleteProduct(id);
                setProducts([]);
                await fetchAllProducts();
                setLoading(false);
                
            } catch (err) {
                setLoading(false);
                setError(err.message)
            }
        }
    }


    const onShowMoreClick = async () => {
        try {
            setLoading(true)
            const numberOfProducts = products.length;
            const startIndex = numberOfProducts;
            const res = await fetch(`https://igi-web-app.onrender.com/api/products/?startIndex=${startIndex}&limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setStatusCode(data.statusCode)
                return;
            }
            if (data.length > 6) {
                const firstSixElements = data.slice(0, 6);
                setProducts(prevProducts => [...prevProducts, ...firstSixElements]);
                setShowMore(true);
                setLoading(false)
            } else {
                setProducts(prevProducts => [...prevProducts, ...data]);
                setShowMore(false);
                setLoading(false)
            }
        } catch (error) {

            setError("Failed to fetch more products.");
            setLoading(false)
        }
    };

    if (products.length === 0 && statusCode != 404) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }


    return (
        <>

            <section className='container my-5'>
                {error && <p className="text-danger text-center">{error}</p>}
                {serverMsg && <p className="text-success text-center">{serverMsg}</p>}
                <Row className="align-items-center">
                    <Col>
                        <h1 className='section-p'>Products</h1>
                    </Col>
                    <Col className="text-end">
                        <Link to={"/admin/products/create"}>
                            <Button className="btn-sm my-3 desiredBtn">
                                <FontAwesomeIcon icon={faPlus} className='me-2' /> Create New Product
                            </Button>
                        </Link>
                    </Col>
                </Row>




                <Table striped bordered hover responsive className="my-2 ">
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>NAME</th>
                            <th>CODE</th>
                            <th>DESCRIPTION</th>
                            <th>FEATURES</th>
                            <th>CATEGORY</th>
                            <th>IMAGE</th>
                            <th>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => {


                            return (
                                <tr key={prod._id}>
                                    <td>{prod._id}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.code}</td>
                                    <td ><p className='truncate'>{prod.description}</p></td>
                                    <td><p className='truncate'>{prod.features}</p></td>
                                    <td>{prod.category.name}</td>
                                    <td style={{ width: "10%" }}><img src={prod.imageUrl} className='img-fluid' style={{ width: "100%" }}></img></td>
                                    <td>
                                        {!loading ? (<Link to={`/admin/products/edit/${prod._id}`}>
                                            <Button style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>) : ("PLEASE WAIT")}
                                        
                                        <Button disabled={loading} style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(prod._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {
                    loading == true ? <Loader className="mt-2" /> : (
                        <div className='d-flex align-items-center justify-content-center'>
                            {showMore && loading == false && (
                                <button
                                    onClick={onShowMoreClick}
                                    className="desiredBtn"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    )
                }



            </section>
        </>
    )
}
