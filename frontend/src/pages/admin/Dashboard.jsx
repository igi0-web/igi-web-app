import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import Loader from '../../components/Loader';
import { editCompanyProfileFailure, editCompanyProfileStart, editCompanyProfileSuccess } from '../../state/admin/admin.slice';


export const Dashboard = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentAdmin, loading, error } = useSelector((state) => {
    return state.admin
  })
  const [localError, setLocalError] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    phoneNumber: "",
    email: "",
    Address: "",
    location: "",
    linkedin: "",
    facebook: "",
    instagram: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
 
  const fetchCProfile = async () => {
    try {

      const res = await fetch(`https://igi-web-app.onrender.com/api/cprofile/`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        setLocalError(data.message)
        setStatusCode(data.statusCode);
        return;
    }

      setFormData(data)

    } catch (error) {
      setLocalError("Failed to fetch the company profile.");
    }
  }

  useEffect(() => {

    if (currentAdmin == null) {
      navigate("/login")
    }

    fetchCProfile();
  }, []);

  
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (currentAdmin == null) {
      navigate("/login")
    }

    dispatch(editCompanyProfileStart());

    try {

      const res = await fetch(`https://igi-web-app.onrender.com/api/cprofile/edit/${currentAdmin._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLocalError(data.message);
        setStatusCode(data.statusCode)
        dispatch(editCompanyProfileFailure(data.message));
        if (data.statusCode == 401) {
            navigate("/login")
        }
        return;
    }

      dispatch(editCompanyProfileSuccess(data));
      setServerMsg(data);
      navigate('/admin/dashboard');

    } catch (err) {

      dispatch(editCompanyProfileFailure(err.message));

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
        <h1 className='text-center section-p mb-3'>Welcome Admin {currentAdmin.name}!</h1>
        <h1 className='text-center section-p'>Dashboard - Company Profile</h1>
        <Form onSubmit={handleSubmit} className='section-p' >
          <Form.Group controlId="phoneNumber" className="my-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control required name='phoneNumber' type="text" placeholder="Enter phone number" onChange={handleChange} value={formData.phoneNumber}></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control required name='email' value={formData.email} type="email" onChange={handleChange} placeholder="Enter email" ></Form.Control>
          </Form.Group>
          <Form.Group controlId="location" className="my-2">
            <Form.Label>Location</Form.Label>
            <Form.Control required name='location' value={formData.location} type="text" onChange={handleChange} placeholder="Enter location" ></Form.Control>
          </Form.Group>
          <Form.Group controlId="address" className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control required name='Address' value={formData.Address} type="text" onChange={handleChange} placeholder="Enter address" ></Form.Control>
          </Form.Group>
          <Form.Group controlId="facebook" className="my-2">
            <Form.Label>Facebook</Form.Label>
            <Form.Control required name='facebook' value={formData.facebook} type="text" onChange={handleChange} placeholder="Enter Facebook profile url" ></Form.Control>
          </Form.Group>
          <Form.Group controlId="instagram" className="my-2">
            <Form.Label>Instagram</Form.Label>
            <Form.Control required name='instagram' value={formData.instagram} type="text" onChange={handleChange} placeholder="Enter Instagram profile url" ></Form.Control>
          </Form.Group>
          <Form.Group controlId="linkedin" className="my-2">
            <Form.Label>Linkedin</Form.Label>
            <Form.Control required name='linkedin' value={formData.linkedin} type="text" onChange={handleChange} placeholder="Enter Linkedin profile url" ></Form.Control>
          </Form.Group>
          <Button disabled={loading ? true : false} type="submit" className="my-2 desiredBtn">{loading ? "UPDATING" : "UPDATE"}</Button>
        </Form>
        {localError && <p className="text-danger text-center">{localError}</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {serverMsg && <p className="text-success text-center">{serverMsg}</p>}
      </section>

    </>
  )
}
