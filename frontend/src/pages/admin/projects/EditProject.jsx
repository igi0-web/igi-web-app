import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { deleteImageFromFirebase } from '../adminUtils/aUtils';
export const EditProject = () => {
    const { currentAdmin } = useSelector((state) => {
        return state.admin
    })
    const params = useParams();
    const navigate = useNavigate()


    const [image, setImage] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [uploadError, setUploadError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        desc: "",
        country: ""
    })
    const [previousImage, setPreviousImage] = useState("")
    useEffect(() => {
        


        const fetchSingleProject = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`/api/projects/${params.id}`);
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
                setError("Cant fetch the project... " + error.message)
            }
        };
        fetchSingleProject();
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
        const storageRef = ref(storage, `/projects/${imageName}`);
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
            const res = await fetch(`/api/projects/edit/${params.id}/${currentAdmin._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
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

            navigate('/admin/projects');

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
    console.log(formData);
    return (
        <>

            <section className='container my-5' >

                <h1 className='text-center section-p'>Edit Project: {formData.title}</h1>
                <Form onSubmit={handleSubmit} className='section-p' >
                    <Form.Group controlId="image" className="my-2">
                        <Form.Label>Upload Image</Form.Label>
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
                    <Form.Group controlId="title" className="my-2">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.title} name='title' type="text" placeholder="Enter project title" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="desc" className="my-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as={"textarea"} required disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.desc} name='desc' type="text" placeholder="Enter project description" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country" className="my-2">
                        <Form.Label>Country</Form.Label>
                        <Form.Control required disabled={(loading == true || uploading == true) ? true : false} onChange={handleChange} value={formData.country} name='country' type="text" placeholder="Enter project country" ></Form.Control>
                    </Form.Group>




                    <Button disabled={(loading == true || uploading == true) ? true : false} type="submit" className="my-2 desiredBtn">{loading || uploading ? "PLEASE WAIT" : "UPDATE"}</Button>
                </Form>
                {error && <p className="text-danger text-center">{error}</p>}
            </section></>
    )
}
