import React from 'react'
import { Form, Button, Row, Col, FormControl } from "react-bootstrap";

export const LogIn = () => {
    return (
        <>
            <section className='container my-5'>
                <h1>Welcome Admin! Sign In</h1>
                <Form autoComplete="off" >
                    <Form.Group controlId="email" className="my-3">
                        <Form.Label>Email Address</Form.Label>
                        <FormControl type="email" placeholder="Enter email"></FormControl>
                    </Form.Group>
                    <Form.Group controlId="password" className="my-3">
                        <Form.Label>Password</Form.Label>
                        <FormControl type="password" placeholder="Enter password" ></FormControl>
                    </Form.Group>
                    <Button type="submit" className="mt-1 desiredBtn" >Sign In</Button>

                </Form>
                <Row className="py-3">
                    <Col>

                    </Col>
                </Row>
            </section>
        </>
    )
}
