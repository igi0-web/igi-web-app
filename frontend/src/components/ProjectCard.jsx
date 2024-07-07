import "../index.css"
import { Link } from 'react-router-dom';
import { ImageContainer } from "./ImageContainer";


export const ProjectCard = ({ _id, title, desc, imageUrl, country, blurhash }) => {


    return (
        <div className='rounded shadow-sm'>
            <Link to={`/projects/${_id}`} className='text-decoration-none'>
                <section className="shadow-sm p-3 d-flex flex-column gap-2 contentsec position-relative rounded">

                    <ImageContainer imageUrl={imageUrl} blurHash={blurhash} type="prd" />
                    <h5 className=" desiredH5 text-decoration-none clamped-text-1" >{title}</h5>
                    <p className=" text-secondary text-decoration-none clamped-text-2">{desc}</p>
                    <h6 className="section-p text-decoration-none my-2">{country}</h6>
                    <a className="desiredBtn linkFix text-center mt-auto" href={`/projects/${_id}`}>Read More</a>
                </section>
            </Link>
        </div>



    )
}



