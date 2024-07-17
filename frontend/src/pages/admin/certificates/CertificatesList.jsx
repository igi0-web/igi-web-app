import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { deleteImageFromFirebase } from '../adminUtils/aUtils';


export const CertificatesList = () => {

    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })

    const [statusCode, setStatusCode] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let [certificates, setCertificates] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const fetchAllCertificates = async () => {
        try {
            setShowMore(false);
            const res = await fetch(`https://igi-web-app.onrender.com/api/certificates?limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message)
                setStatusCode(data.statusCode);
                return;
            }
            if (data.length > 6) {

                const firstSixElements = data.slice(0, 6);
                setCertificates(firstSixElements);
                setShowMore(true);
            } else {
                setCertificates(data);
                setShowMore(false);
            }


        } catch (error) {
            setError("Failed to fetch certificates.");
        }
    }

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }

        fetchAllCertificates();
    }, [])

    const deleteCertificate = async (id) => {

        try {

            const res = await fetch(`https://igi-web-app.onrender.com/api/certificates/delete/${id}/${currentAdmin._id}`, {
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

            setServerMsg("Successfully deleted the certificate!")



        } catch (error) {
            setError(error.message);
        }

    }
    const fetchCertificateDetails = async (id) => {
        try {
            const res = await fetch(`https://igi-web-app.onrender.com/api/certificates/${id}`);
            const cer = await res.json();
            if (cer.success === false) {
                setStatusCode(cer.statusCode)
                setError(cer.message);
                return;
            }
            return cer.imageUrl; 
        } catch (error) {
            console.error("Error fetching certificate details:", error);
            throw error;
        }
    };
    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to delete this certificate?")) {
            try {
                setLoading(true)
               
                const imageUrl = await fetchCertificateDetails(id);
                await deleteImageFromFirebase(imageUrl)
                await deleteCertificate(id);
                setCertificates([]);
                
                await fetchAllCertificates();
                setLoading(false);
                
            } catch (err) {
                setLoading(false);
                setError(err.message)
            }
        }
    }
    if (certificates.length === 0 && statusCode != 404) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }


    const onShowMoreClick = async () => {
        try {
            setLoading(true)
            const numberOfCertificates = certificates.length;
            const startIndex = numberOfCertificates;
            const res = await fetch(`/api/certificates/?startIndex=${startIndex}&limit=7`);
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setStatusCode(data.statusCode)
                return;
            }
            if (data.length > 6) {
                const firstSixElements = data.slice(0, 6);
                setCertificates(prevCertificates => [...prevCertificates, ...firstSixElements]);
                setShowMore(true);
                setLoading(false)
            } else {
                setCertificates(prevCertificates => [...prevCertificates, ...data]);
                setShowMore(false);
                setLoading(false)
            }
        } catch (error) {
            console.error("Failed to fetch more certificates:", error);
            setError("Failed to fetch more certificates.");
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
                        <h1 className='section-p'>Certificates</h1>
                    </Col>
                    <Col className="text-end">
                        <Link to={"/admin/certificates/create"}>
                            <Button className="btn-sm my-3 desiredBtn">
                                <FontAwesomeIcon icon={faPlus} className='me-2' /> Create New Certificate
                            </Button>
                        </Link>
                    </Col>
                </Row>




                <Table striped bordered hover responsive className="my-2 ">
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>IMAGE</th>
                            <th>OPERATIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificates.map((cer) => {


                            return (
                                <tr key={cer._id}>
                                    <td>{cer._id}</td>
                                    <td>{cer.title}</td>
                                    <td style={{ width: "10%" }}><img src={cer.imageUrl} className='img-fluid' style={{ width: "100%" }}></img></td>
                                    <td>

                                        <Button disabled={loading} style={{ color: "white" }} variant="danger" onClick={() => deleteHandler(cer._id)} type="button" className="btn-sm my-2"><FontAwesomeIcon icon={faTrash} size='2x' className='mx-auto icon ' /></Button>

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
