import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
export const AdminsList = () => {

    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [admins, setAdmins] = useState([]);
    const [statusCode, setStatusCode] = useState("");


    const fetchAllAdmins = async () => {
        try {
            const res = await fetch(`/api/admins/${currentAdmin._id}`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setStatusCode(data.statusCode)
                if (data.statusCode == 401) {
                    navigate("/login")
                }
                return;
            }
            setAdmins(data);
        } catch (error) {
            setError(data.message)
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }
        fetchAllAdmins();
    }, [])

    const deleteAdmin = async (id) => {

        try {
            const res = await fetch(`/api/admins/delete/${id}/${currentAdmin._id}`, {
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
            setServerMsg(data);
        } catch (error) {
            setError(error.message);
        }

    }

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this admin?")) {
            try {
                setLoading(true)
                await deleteAdmin(id);
                setAdmins([]);
                await fetchAllAdmins();
                setLoading(false);
                setServerMsg("Successfully deleted the admin!")
            } catch (err) {
                setLoading(false);
                setError(err.message)
            }
        }
    }
    if (admins.length == 0 && statusCode != 404) {
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
                        <h1 className='section-p'>Admins</h1>
                        <p className='text-danger'>Note: You can't delete super admins.</p>
                    </Col>
                    <Col className="text-end">
                        <Link className='me-2' to={"/admin/admins/create"}>
                            <Button className="btn-sm my-3 desiredBtn">
                                <FontAwesomeIcon icon={faPlus} className='me-2' /> Create New Admin
                            </Button>
                        </Link>

                    </Col>

                </Row>
                <Table striped bordered hover responsive className="my-2 ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>SUPER</th>
                            <th>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((a) => {


                            return (
                                <tr key={a._id}>
                                    <td>{a._id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.email}</td>
                                    <td>{a.phone}</td>
                                    <td>{a.super == true ? "YES" : "NO"}</td>

                                    <td>

                                        <Button disabled={currentAdmin._id == a._id || a.super == true || loading} style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(a._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {
                    loading == true ? <Loader className="mt-2" /> : ""
                }

            </section>
        </>
    )
}
