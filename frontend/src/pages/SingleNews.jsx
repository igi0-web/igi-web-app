import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Col, Container, Row } from 'react-bootstrap';
export const SingleNews = () => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString();
    };
    const params = useParams();
    const [event, setEvent] = useState({});
    console.log(event);

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {

                const res = await fetch(`https://igi-web-app.onrender.com/api/news/${params.id}`);
                const data = await res.json();
                if (data.success === false) {

                    return;
                }
                setEvent(data);

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchSingleEvent();
    }, [params.id]);



    if (Object.values(event).length === 0) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }
    return (
        <>
            <Container className="p-4 section-p my-5">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
                        <img
                            src={`${event.imageUrl}`}
                            alt={event.title}
                            fluid
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            className="project-image"
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <h1>{event.title}</h1>

                        <p className='text-secondary'>{event.desc}</p>
                        <h5>{formatDate(event.createdAt)}</h5>
                    </Col>
                </Row>
                <div class="row mt-3">
                    <div class="col-12">
                        <a href="/news" class=" btn desiredBtn w-100">Other Events</a>
                    </div>

                </div>
            </Container>

            

        </>

    )
}
