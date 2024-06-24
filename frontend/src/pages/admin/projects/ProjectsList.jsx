import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
export const ProjectsList = () => {
    const { currentAdmin } = useSelector((state) => {

        return state.admin
    })
    const [statusCode, setStatusCode] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [projects, setProjects] = useState([]);
    const fetchAllProjects = async () => {
        try {
            
            const res = await fetch(`/api/projects/`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                setStatusCode(data.statusCode);
                return;
            }
            setProjects(data);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllProjects();
    }, [])

    const deleteProject = async (id) => {

        try {

            const res = await fetch(`/api/projects/delete/${id}/${currentAdmin._id}`, {
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
        if (window.confirm("Are you sure that you want to delete this project?")) {
            try {
                console.log(id);
                await deleteProject(id);
                projects = [];
                setLoading(true)
                fetchAllProjects();
                setLoading(false);
                setServerMsg("Successfully deleted the project!")
                console.log("Project Deleted!");
            } catch (err) {
                setLoading(false);
                setError(err.message)
                console.log(err.message);
            }
        }
    }
    if ((projects.length === 0 || loading == true) && statusCode != 404) {
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
                        <h1 className='section-p'>Projects</h1>
                    </Col>
                    <Col className="text-end">
                        <Link to={"/admin/projects/create"}>
                            <Button className="btn-sm my-3 desiredBtn">
                                <FontAwesomeIcon icon={faPlus} className='me-2' /> Create New Project
                            </Button>
                        </Link>
                    </Col>
                </Row>




                <Table striped bordered hover responsive className="my-2 ">
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>COUNTRY</th>
                            <th>IMAGE</th>
                            <th>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((proj) => {


                            return (
                                <tr key={proj._id}>
                                    <td>{proj._id}</td>
                                    <td>{proj.title}</td>
                                    <td><p className='truncate'>{proj.desc}</p></td>
                                    <td>{proj.country}</td>
                                    <td style={{ width: "10%" }}><img src={proj.imageUrl} className='img-fluid' style={{ width: "100%" }}></img></td>
                                    <td>
                                        <Link to={`/admin/projects/edit/${proj._id}`}>
                                            <Button style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>
                                        <Button style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(proj._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

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
