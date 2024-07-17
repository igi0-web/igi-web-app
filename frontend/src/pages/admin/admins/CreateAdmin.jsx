import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const CreateAdmin = () => {
    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    })
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
            const res = await fetch(`https://igi-web-app.onrender.com/api/admins/create/${currentAdmin._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {

                setLoading(false)


                setError(data.message)


                return;
            }
            setLoading(false)

            navigate('/admin/admins');

        } catch (err) {
            setError(err.message)
        }

    }
    console.log(formData);
    return (
        <>
            
            <section className='container my-5' >

                <h1 className='text-center section-p'>Create Admin</h1>
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
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.password} name='password' type="text" placeholder="Enter admin password" ></Form.Control>
                    </Form.Group>



                    <Button disabled={loading == true ? true : false} type="submit" className="my-2 desiredBtn">{loading ? "PLEASE WAIT" : "CREATE"}</Button>
                </Form>
                <p className='text-danger'>{error}</p>
            </section></>
    )
}
