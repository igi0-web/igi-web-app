import React, { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';
import { Button, Modal } from "react-bootstrap";
export const ImageContainer = ({ imageUrl, blurHash, type }) => {
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState('');

    const handleShow = (photo) => {
        setSelectedPhoto(photo);
        setShow(true);
    };

    const handleClose = () => setShow(false);
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setLoaded(true);
        }
        img.src = imageUrl
    }, [imageUrl])

    return (
        <div className="ratio ratio-4x3 rounded image-container" height={240}>
            <div style={{display: loaded ? "none" : "inline"}}>
                {!loaded && (<Blurhash hash={blurHash} width="100%" height={240} punch={1} resolutionX={32} resolutionY={32} />)}

            </div>
            {type === "cer" ? loaded && (<img onClick={() => handleShow(imageUrl)} loading='lazy' style={{display: !loaded ? "none" : "inline", cursor:"pointer"}} src={imageUrl} className={`img-fluid object-fit-contain rounded top-focused`} />) : loaded && (<img  loading='lazy' style={{display: !loaded ? "none" : "inline", cursor:"pointer"}} src={imageUrl} className={`img-fluid object-fit-cover rounded`} />)}
       
            <Modal show={type === "cer" && loaded && show} onHide={handleClose} centered>
                
                <Modal.Body>
                    <img src={selectedPhoto} style={{ width: '100%' }} />
                </Modal.Body>
                
            </Modal>


        </div>
    )
}
