import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';

export const EditCategory = () => {
    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })
    const params = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({

        name: "",

    })
    useEffect(() => {
        const fetchSingleCat = async () => {
            try {

                const res = await fetch(`https://igi-web-app.onrender.com/api/products/categories/${params.id}`);
                const data = await res.json();
                if (data.success === false) {

                    return;
                }

                setFormData(data)
                console.log(data);

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchSingleCat();


    }, [params.id])

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
            const res = await fetch(`https://igi-web-app.onrender.com/api/categories/edit/${params.id}/${currentAdmin._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                if (data.statusCode != 201) {
                    setLoading(false)
                    navigate("/login")
                }
                setLoading(false)

                return;
            }
            setLoading(false)

            navigate('/admin/categories');

        } catch (err) {
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
console.log(formData);
    return (
        <>

            <section className='container my-5' >

                <h1 className='text-center section-p'>Edit Category</h1>
                <Form onSubmit={handleSubmit} className='section-p' >


                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.name} name='name' type="text" placeholder="Enter category name" ></Form.Control>
                    </Form.Group>



                    <Button disabled={loading == true ? true : false} type="submit" className="my-2 desiredBtn">{loading ? "PLEASE WAIT" : "UPDATE"}</Button>
                </Form>

            </section></>
    )
}
