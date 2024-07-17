import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { deleteImageFromFirebase } from '../adminUtils/aUtils';

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
    const [showMore, setShowMore] = useState(false);


    const fetchAllEvents = async () => {
        try {
            setShowMore(false);
            const res = await fetch(`https://igi-web-app.onrender.com/api/news?limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message)
                setStatusCode(data.statusCode);
                return;
            }
            if (data.length > 6) {

                const firstSixElements = data.slice(0, 6);
                setEvents(firstSixElements);
                setShowMore(true);
            } else {
                setEvents(data);
                setShowMore(false);
            }


        } catch (error) {
            setError("Failed to fetch events.");
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

            const res = await fetch(`https://igi-web-app.onrender.com/api/news/delete/${id}/${currentAdmin._id}`, {
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

            setServerMsg("Successfully deleted the event!")

        } catch (error) {

            setError(error.message);
        }

    }

    const fetchEventDetails = async (id) => {
        try {
            const res = await fetch(`https://igi-web-app.onrender.com/api/news/${id}`);
            const event = await res.json();
            if (event.success === false) {
                setStatusCode(event.statusCode)
                setError(event.message);
                return;
            }
            return event.imageUrl;
        } catch (error) {
            console.error("Error fetching event details:", error);
            throw error;
        }
    };
    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this event?")) {
            try {
                setLoading(true)
                const imageUrl = await fetchEventDetails(id);
                await deleteImageFromFirebase(imageUrl)
                await deleteEvent(id);
                setEvents([]);
                await fetchAllEvents();
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(err.message)

            }
        }
    }

    if (events.length === 0 && statusCode != 404) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }


    const onShowMoreClick = async () => {
        try {
            setLoading(true)
            const numberOfEvents = events.length;
            const startIndex = numberOfEvents;
            const res = await fetch(`/api/news/?startIndex=${startIndex}&limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setStatusCode(data.statusCode)
                return;
            }
            if (data.length > 6) {
                const firstSixElements = data.slice(0, 6);
                setEvents(prevEvents => [...prevEvents, ...firstSixElements]);
                setShowMore(true);
                setLoading(false)
            } else {
                setEvents(prevEvents => [...prevEvents, ...data]);
                setShowMore(false);
                setLoading(false)
            }
        } catch (error) {
            console.error("Failed to fetch more events:", error);
            setError("Failed to fetch more events.");
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
                                        {!loading ? (<Link to={`/admin/events/edit/${ev._id}`}>
                                            <Button style={{ color: "white" }} variant='dark' type="button" className="btn-sm my-2 me-2"><FontAwesomeIcon icon={faEdit} size='2x' className='mx-auto icon' /></Button>
                                        </Link>) : ("PLEASE WAIT")}
                                        
                                        <Button disabled={loading} style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(ev._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

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
