import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { deleteImageFromFirebase } from '../adminUtils/aUtils';

export const EditProduct = () => {
    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })
    const params = useParams();
    const navigate = useNavigate()

    const [cats, setCats] = useState([])
    const [image, setImage] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [uploadError, setUploadError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrl: "",
        name: "",
        code: "",
        description: "",
        features: "",
        category: ""
    })
    const [previousImage, setPreviousImage] = useState("")
    useEffect(() => {
        

        const fetchAllCats = async () => {
            try {
    
                setLoading(true);
                setError("");
    
                const res = await fetch(`https://igi-web-app.onrender.com/api/products/categories/`);
                const data = await res.json();
                if (data.success === false) {
                    setError(data.message)
                    setLoading(false);
                    return;
                }
                setCats(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Cant fetch categories... " + error.message)
    
            }
        }

        const fetchSingleProduct = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`https://igi-web-app.onrender.com/api/products/${params.id}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(data.message)
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setFormData(data)
                setPreviousImage(data.imageUrl);

            } catch (error) {
                setLoading(false);
                setError("Cant fetch the product... " + error.message)
            }
        };
        fetchSingleProduct();

        fetchAllCats();
    }, [image, params.id])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageUpload = async (image) => {
        setUploading(true);
        setUploadError("")
        await deleteImageFromFirebase(previousImage);
        const storage = getStorage(app);
        const imageName = new Date().getTime() + image.name;
        const storageRef = ref(storage, `/products/${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            setUploadPerc(Math.round(progress));

        }, (error) => {
            setUploading(false);
            setUploadError(error.message);
        }, async () => {
            try {
                const imageUrlFromFirebase = await getDownloadURL(uploadTask.snapshot.ref)
                setFormData({
                    ...formData,
                    imageUrl: imageUrlFromFirebase
                })
                setUploading(false);
            } catch (error) {
                setUploading(false);
                setUploadError(error.message);
                console.log("Uploading the image completed but can't get the url!");
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentAdmin == null) {
            navigate("/login")
        }

        try {
            setLoading(true);
            setError("");
            const res = await fetch(`https://igi-web-app.onrender.com/api/products/edit/${params.id}/${currentAdmin._id}`, {
                method: "PATCH",
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

            navigate('/admin/products');

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

                <h1 className='text-center section-p'>Edit Product: {formData.name} - {formData.category.name}</h1>
                <Form onSubmit={handleSubmit} className='section-p' >
                    <Form.Group controlId="image" className="my-2">
                        <Form.Label>Upload Image: Please upload an image first. The image should be less than 2MB!</Form.Label>
                        <Form.Control disabled={(loading == true || uploading == true) ? true : false} onChange={(e) => setImage(e.target.files[0])} name='image' type="file" placeholder="Upload product image" ></Form.Control>
                        <Button
                            type="button"
                            onClick={(e) => handleImageUpload(image)}
                            className="desiredBtn my-3"
                            disabled={(loading == true || uploading == true) ? true : false}
                        >
                            {uploading ? "UPLOADING..." : "UPLOAD"}
                        </Button>
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
                        <Form.Control required disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.name} name='name' type="text" placeholder="Enter product name" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="code" className="my-2">
                        <Form.Label>Code</Form.Label>
                        <Form.Control disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.code} name='code' type="text" placeholder="Enter product code" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description" className="my-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as={"textarea"} required disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.description} name='description' type="text" placeholder="Enter product description" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="features" className="my-2">
                        <Form.Label>Features</Form.Label>
                        <Form.Control as={"textarea"} required disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.features} name='features' type="text" placeholder="Enter product features" ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category" className="my-2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control required disabled={(loading == true || uploading == true) ? true : false}
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


                    <Button disabled={(loading == true || uploading == true) ? true : false} type="submit" className="my-2 desiredBtn">{loading || uploading ? "PLEASE WAIT" : "UPDATE"}</Button>
                </Form>
                {error && <p className="text-danger text-center">{error}</p>}
            </section></>
    )
}
