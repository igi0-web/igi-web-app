import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const CreateCategory = () => {
    const { currentAdmin } = useSelector((state) => {
        return state.admin
      })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: ""
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
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`https://igi-web-app.onrender.com/api/products/categories/create/${currentAdmin._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
          if (data.success === false) {
            if (data.statusCode == 401) {
              navigate("/login")
          }
          setLoading(false)
          setError(data.message);
          return;
          }
          setLoading(false)
          
          navigate('/admin/categories');
    
        } catch (err) {
          setLoading(false)
          setError("Can't create the category! " + err.message)
        }
    
      }
     
    return (
        <>

            <section className='container my-5' >

                <h1 className='text-center section-p'>Create Category</h1>
                <Form onSubmit={handleSubmit} className='section-p' >
                    
                   
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.name} name='name' type="text" placeholder="Enter category name" ></Form.Control>
                    </Form.Group>
                    
                   

                    <Button disabled={loading == true ? true : false} type="submit" className="my-2 desiredBtn">{loading ? "PLEASE WAIT" : "CREATE"}</Button>
                </Form>
                {error && <p className="text-danger text-center">{error}</p>}
            </section></>
    )
}
