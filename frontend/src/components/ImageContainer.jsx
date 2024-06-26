import React, { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';

export const ImageContainer = ({ imageUrl, blurHash }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setLoaded(true);
        }
        img.src = imageUrl
    }, [imageUrl])

    return (
        <div className="ratio ratio-4x3 rounded" height={240}>
            <div style={{display: loaded ? "none" : "inline"}}>
                {!loaded && (<Blurhash hash={blurHash} width="100%" height={240} punch={1} resolutionX={32} resolutionY={32} />)}

            </div>
            {loaded && (<img loading='lazy' style={{display: !loaded ? "none" : "inline"}} src={imageUrl} className={`img-fluid object-fit-cover rounded`} />)}
            

        </div>
    )
}
