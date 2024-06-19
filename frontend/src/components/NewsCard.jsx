import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import "../index.css"
export const NewsCard = ({ _id, title, createdAt, imageUrl }) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(); 
    };
   
    return (
        <div className='rounded'
        ><Link to={`/news/${_id}`} className='text-decoration-none'>
                <section className="shadow p-3 d-flex flex-column gap-2 contentsec position-relative">

                    <div className="ratio ratio-4x3">
                        <img src={imageUrl} className="img-fluid object-fit-cover rounded" alt="event image" />
                    </div>
                    <h5 className="desiredH5 text-decoration-none text-truncate"  style={{ maxWidth: '1000px' }}>{title}</h5>
                    <p className="section-p text-decoration-none">{formatDate(createdAt)}</p>
                    <a className="desiredBtn linkFix text-center mt-auto" href={`/news/${_id}`}>Check Event</a>
                </section>
            </Link>
        </div>



    )
}



