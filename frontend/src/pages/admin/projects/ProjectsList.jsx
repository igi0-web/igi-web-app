import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { deleteImageFromFirebase } from '../adminUtils/aUtils';


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
    const [showMore, setShowMore] = useState(false);

    const fetchAllProjects = async () => {

        try {

            setShowMore(false);
            const res = await fetch(`/api/projects?limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message)
                setStatusCode(data.statusCode);
                return;
            }
            if (data.length > 6) {

                const firstSixElements = data.slice(0, 6);
                setProjects(firstSixElements);
                setShowMore(true);
            } else {
                setProjects(data);
                setShowMore(false);
            }
           

        } catch (error) {
            setError("Failed to fetch projects.");
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllProjects();
    }, [])


    const fetchProjectDetails = async (id) => {
        try {
            const res = await fetch(`/api/projects/${id}`);
            const project = await res.json();
            if (project.success === false) {
                setStatusCode(project.statusCode)
                setError(project.message);
                return;
            }
            return project.imageUrl; 
        } catch (error) {
            console.error("Error fetching project details:", error);
            throw error;
        }
    };

    const deleteProject = async (id) => {

        try {

            const res = await fetch(`/api/projects/delete/${id}/${currentAdmin._id}`, {
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
            setServerMsg("Successfully deleted the project!")
        } catch (error) {
           
            setError(error.message);
        }

    }

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this project?")) {
            try {
                setLoading(true)
                const imageUrl = await fetchProjectDetails(id);
                await deleteImageFromFirebase(imageUrl)
                await deleteProject(id);
                setProjects([]);
                await fetchAllProjects();
                setLoading(false);
                
            } catch (err) {
                setLoading(false);
                setError(err.message)
            }
        }
    }

    if (projects.length === 0  && statusCode != 404) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }

    const onShowMoreClick = async () => {
        try {
            setLoading(true)
            const numberOfProjects = projects.length;
            const startIndex = numberOfProjects;
            const res = await fetch(`/api/projects/?startIndex=${startIndex}&limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setStatusCode(data.statusCode)
                return;
            }
            if (data.length > 6) {
                const firstSixElements = data.slice(0, 6);
                setProjects(prevProjects => [...prevProjects, ...firstSixElements]);
                setShowMore(true);
                setLoading(false)
            } else {
                setProjects(prevProjects => [...prevProjects, ...data]);
                setShowMore(false);
                setLoading(false)
            }
        } catch (error) {
            console.error("Failed to fetch more projects:", error);
            setError("Failed to fetch more projects.");
            setLoading(false)
        }
    };
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
                                        {!loading ? (<Link to={`/admin/projects/edit/${proj._id}`} >
                                            <Button disabled={loading} style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>) : "PLEASE WAIT"}
                                        
                                        <Button disabled={loading} style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(proj._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

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
