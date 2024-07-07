import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInFailure, signInSuccess } from '../../state/admin/admin.slice';

export const LogIn = () => {
    const navigate = useNavigate();
    
   
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { loading, error } = useSelector((state) => state.admin);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/admin/dashboard');

        } catch (err) {
            dispatch(signInFailure(err.message));
        }
    };

    return (
        <>
            <section className='container my-5'>
                <h1 className='section-p'>Welcome Admin! Sign In</h1>
                <p className='text-danger'>If you're not an admin, please return back to the website.</p>
                <Form className='section-p' autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group controlId="email" className="my-3">
                        <Form.Label>Email Address</Form.Label>
                        <FormControl value={formData.email} name='email' onChange={handleChange} type="email" placeholder="Enter email"></FormControl>
                    </Form.Group>
                    <Form.Group controlId="password" className="my-3">
                        <Form.Label>Password</Form.Label>
                        <FormControl value={formData.password} name='password' onChange={handleChange} type="password" placeholder="Enter password" ></FormControl>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="mt-1 desiredBtn" >{loading ? "LOADING..." : "Sign In"}</Button>

                </Form>
                <Row className="py-3">
                    <Col>
                        {error && <p className="text-danger">{error}</p>}
                    </Col>
                </Row>

            </section>
        </>
    )
}
