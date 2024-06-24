import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
export const EventsList = () => {
    const { currentAdmin } = useSelector((state) => {

        return state.admin
    })
    const [statusCode, setStatusCode] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [events, setEvents] = useState([]);
    const fetchAllEvents = async () => {
        try {

            const res = await fetch(`/api/news/`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                setStatusCode(data.statusCode);
                return;
            }
            setEvents(data);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllEvents();
    }, [])

    const deleteEvent = async (id) => {

        try {

            const res = await fetch(`/api/news/delete/${id}/${currentAdmin._id}`, {
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
        if (window.confirm("Are you sure that you want to delete this event?")) {
            try {
                console.log(id);
                await deleteEvent(id);
                events = [];
                setLoading(true)
                fetchAllEvents();
                setLoading(false);
                setServerMsg("Successfully deleted the event!")
                console.log("Event Deleted!");
            } catch (err) {
                setLoading(false);
                setError(err.message)
                console.log(err.message);
            }
        }
    }
    if ((events.length === 0 || loading == true) && statusCode != 404) {
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
                        <h1 className='section-p'>Events</h1>
                    </Col>
                    <Col className="text-end">
                        <Link to={"/admin/events/create"}>
                            <Button className="btn-sm my-3 desiredBtn">
                                <FontAwesomeIcon icon={faPlus} className='me-2' /> Create New Event
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
                            <th>IMAGE</th>
                            <th>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((ev) => {


                            return (
                                <tr key={ev._id}>
                                    <td>{ev._id}</td>
                                    <td>{ev.title}</td>
                                    <td><p className='truncate'>{ev.desc}</p></td>
                                    <td style={{ width: "10%" }}><img src={ev.imageUrl} className='img-fluid' style={{ width: "100%" }}></img></td>
                                    <td>
                                        <Link to={`/admin/events/edit/${ev._id}`}>
                                            <Button style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>
                                        <Button style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(ev._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

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
