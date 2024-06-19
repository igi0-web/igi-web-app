import "../index.css"
import { Link } from 'react-router-dom';


export const ProjectCard = ({ _id, title, desc, imageUrl, country }) => {
    

    return (
        <div className='rounded'>
            <Link to={`/projects/${_id}`} className='text-decoration-none'>
                <section className="shadow p-3 d-flex flex-column gap-2 contentsec position-relative rounded">

                    <div className="ratio ratio-4x3">
                        <img src={imageUrl} className="img-fluid object-fit-cover rounded" alt="project image" />
                    </div>
                    <h5 className="desiredH5 text-decoration-none clamped-text-2" >{title}</h5>
                    <p className="section-p text-decoration-none clamped-text-2">{desc}</p>
                    <p className="section-p text-decoration-none my-2">{country}</p>
                    <a className="desiredBtn linkFix text-center mt-auto" href={`/projects/${_id}`}>Read More</a>
                </section>
            </Link>
        </div>



    )
}



