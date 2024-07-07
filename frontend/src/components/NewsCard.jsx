import { Link } from 'react-router-dom';

import "../index.css"
import { ImageContainer } from './ImageContainer';
export const NewsCard = ({ _id, title, createdAt, imageUrl, blurhash }) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString();
    };

    return (
        <div className='rounded'>
            <Link to={`/news/${_id}`} className='text-decoration-none shadow-sm'>
                <section className="shadow-sm p-3 d-flex flex-column gap-2 contentsec position-relative rounded">

                <ImageContainer imageUrl={imageUrl} blurHash={blurhash} type="news"/>
                    <h5 className="desiredH5 text-decoration-none clamped-text-1" >{title}</h5>
                    <p className="section-p text-decoration-none">{formatDate(createdAt)}</p>
                    <a className="desiredBtn linkFix text-center mt-auto" href={`/news/${_id}`}>Check Event</a>
                </section>
            </Link>
        </div>



    )
}



