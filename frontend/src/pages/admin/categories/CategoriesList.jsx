import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

export const CategoriesList = () => {

    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [cats, setCats] = useState([]);
    const [statusCode, setStatusCode] = useState("");


    const fetchAllCats = async () => {
        try {

            const res = await fetch(`/api/products/categories/`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message)
                setStatusCode(data.statusCode);
                return;
            }
            setCats(data);

        } catch (error) {
            setError("Failed to fetch categories.");
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllCats();
    }, [])

    const deleteCat = async (id) => {

        try {

            const res = await fetch(`/api/products/categories/delete/${id}/${currentAdmin._id}`, {
                method: "DELETE"
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

            setServerMsg("Successfully deleted the category and associated products!")

        } catch (error) {
            setError(error.message);
        }

    }

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this category? All associated products will be deleted!")) {
            try {
                setLoading(true)
                
                await deleteCat(id);
                setCats([]);
                await fetchAllCats();
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message)
            }
        }
    }
    

    if (cats.length === 0 && statusCode != 404) {
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
                        <h1 className='section-p'>Categories</h1>
                    </Col>
                    <Col className="text-end">
                        <Link to={"/admin/categories/create"}>
                            <Button className="btn-sm my-3 desiredBtn">
                                <FontAwesomeIcon icon={faPlus} className='me-2' /> Create New Category
                            </Button>
                        </Link>
                    </Col>
                </Row>




                <Table striped bordered hover responsive className="my-2 ">
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>NAME</th>
                            <th>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cats.map((cat) => {


                            return (
                                <tr key={cat._id}>
                                    <td>{cat._id}</td>
                                    <td>{cat.name}</td>

                                    <td>
                                        {!loading ? (<Link to={`/admin/categories/edit/${cat._id}`}>
                                            <Button style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>) : ("PLEASE WAIT")}
                                        
                                        <Button disabled={loading} style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(cat._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

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
