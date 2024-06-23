import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const CreateProduct = () => {
    const { currentAdmin } = useSelector((state) => {
        return state.admin
      })
      const navigate = useNavigate()
    const [cats, setCats] = useState([])
    const [image, setImage] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [uploadError, setUploadError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        imageUrl: "",
        name: "",
        code: "",
        description: "",
        features: "",
        category: ""
    })
    useEffect(() => {
        if (image) {
            setLoading(true);
            setUploadError("")
            handleImageUpload(image)
            setLoading(false);
        }

        const fetchAllCats = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/products/categories/`);
                const data = await res.json();
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                    return;
                }
                setCats(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message)
                console.log(error.message);
            }
        }

        fetchAllCats();
    }, [image])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageUpload = (image) => {
        setLoading(true);
        setUploadError("")
        const storage = getStorage(app);
        const imageName = new Date().getTime() + image.name;
        const storageRef = ref(storage, `/products/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            setUploadPerc(Math.round(progress));
            setLoading(false);
        }, (error) => {
            setLoading(false);
            setUploadError(true);
        }, async () => {
            try {
                const imageUrlFromFirebase = await getDownloadURL(uploadTask.snapshot.ref)
                setFormData({
                    ...formData,
                    imageUrl: imageUrlFromFirebase
                })
                setLoading(false);
            } catch (error) {
                console.log("Uploading the image completed but can't get the url!");
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentAdmin == null) {
          navigate("/login")
        }
        setLoading(true)
        try {
          const res = await fetch(`/api/products/create/${currentAdmin._id}`, {
            method: "POST",
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
          
          navigate('/admin/products');
    
        } catch (err) {
         setError(err.message)
        }
    
      }
   

    return (
        <>

            <section className='container my-5' >

                <h1 className='text-center section-p'>Create Product</h1>
                <Form onSubmit={handleSubmit} className='section-p' >
                    <Form.Group controlId="image" className="my-2">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={(e) => setImage(e.target.files[0])} name='image' type="file" placeholder="Upload product image" ></Form.Control>
                    </Form.Group>
                    <p className="text-center">
                        {uploadError ? (
                            <span className="text-danger">
                                Can't upload image! Make sure your image is less than 2MB.
                            </span>
                        ) : uploadPerc > 0 && uploadPerc < 100 ? (
                            <span className="text-warning">{`Uploading ${uploadPerc}%`}</span>
                        ) : uploadPerc === 100 ? (
                            <span className="text-success">
                                Upload complete!
                            </span>
                        ) : (
                            ""
                        )}
                    </p>
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.name} name='name' type="text" placeholder="Enter product name" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="code" className="my-2">
                        <Form.Label>Code</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false} onChange={handleChange} value={formData.code} name='code' type="text" placeholder="Enter product code" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description" className="my-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as={"textarea"} required disabled={loading == true ? true : false} onChange={handleChange} value={formData.description} name='description' type="text" placeholder="Enter product description" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="features" className="my-2">
                        <Form.Label>Features</Form.Label>
                        <Form.Control as={"textarea"} required disabled={loading == true ? true : false} onChange={handleChange} value={formData.features} name='features' type="text" placeholder="Enter product features" ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category" className="my-2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control required disabled={loading == true ? true : false}
                            as="select"
                            onChange={handleChange}
                            value={formData.category}
                            name="category"
                        >
                            <option value="">Select a category</option>
                            {cats.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                   

                    <Button disabled={loading == true ? true : false} type="submit" className="my-2 desiredBtn">{loading ? "PLEASE WAIT" : "CREATE"}</Button>
                </Form>
                
            </section></>
    )
}
