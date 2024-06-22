import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
export const ProductsList = () => {
    const { currentAdmin } = useSelector((state) => {

        return state.admin
    })
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [products, setProducts] = useState([]);
    const fetchAllProducts = async () => {
        try {

            const res = await fetch(`/api/products/`);
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

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllProducts();
    }, [])

    const deleteProduct = async (id) => {

        try {

            const res = await fetch(`/api/products/delete/${id}/${currentAdmin._id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                if (data.statusCode != 200) {
                    navigate("/login")
                }
                console.log(data.message);
                return;
            }



        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }

    }

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this product?")) {
            try {
                console.log(id);
                await deleteProduct(id);
                products = [];
                setLoading(true)
                fetchAllProducts();
                setLoading(false);
                setServerMsg("Successfully deleted the product!")
                console.log("Product Deleted!");
            } catch (err) {
                setLoading(false);
                setError(err.message)
                console.log(err.message);
            }
        }
    }
    if (products.length === 0 || loading == true) {
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
                                    <td>{prod.description}</td>
                                    <td>{prod.features}</td>
                                    <td>{prod.category.name}</td>
                                    <td style={{ width: "10%" }}><img src={prod.imageUrl} className='img-fluid' style={{ width: "100%" }}></img></td>
                                    <td>
                                        <Link to={`/admin/products/edit/${prod._id}`}>
                                            <Button style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>
                                        <Button style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(prod._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>


            </section>
        </>
    )
}
