import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';

export const EditAdmin = () => {

    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })

    const params = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [serverMsg, setServerMsg] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    })

    const fetchSingleAdmin = async () => {
        try {

            const res = await fetch(`https://igi-web-app.onrender.com/api/admins/profile/${currentAdmin._id}`, {
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

            setFormData(data)


        } catch (error) {
            setError(error.message)

        }
    };

    useEffect(() => {
        if (currentAdmin == null) {
            navigate("/login")
        }
        fetchSingleAdmin();


    }, [currentAdmin._id])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentAdmin == null) {
            navigate("/login")
        }
        setLoading(true)
        try {
            const res = await fetch(`https://igi-web-app.onrender.com/api/admins/edit/${currentAdmin._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(formData),
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
            setLoading(false)
            setServerMsg("Profile Updated Successfully");
            navigate('/admin/dashboard');

        } catch (err) {
            setLoading(false)
            setError(err.message)
        }

    }

    if (Object.values(formData).every(value => value === '')) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }


    return (
        <>

            <section className='container my-5' >

                <h1 className='text-center section-p'>My Profile</h1>
                <Form onSubmit={handleSubmit} className='section-p' >


                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.name} name='name' type="text" placeholder="Enter admin name" ></Form.Control>
                    </Form.Group>



                    <Form.Group controlId="phone" className="my-2">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.phone} name='phone' type="text" placeholder="Enter admin phone" ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.email} name='email' type="text" placeholder="Enter admin email" ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="phone" className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control disabled={loading == true ? true : false} onChange={handleChange} value={formData.password} name='password' type="text" placeholder="Enter admin password" ></Form.Control>
                    </Form.Group>



                    <Button disabled={loading == true ? true : false} type="submit" className="my-2 desiredBtn">{loading ? "PLEASE WAIT" : "UPDATE"}</Button>
                </Form>
                {error && <p className="text-danger text-center">{error}</p>}
                {serverMsg && <p className="text-success text-center">{serverMsg}</p>}
            </section></>
    )
}
