import "../index.css"
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

export const ProductCard = ({ _id, name, code, imageUrl, description, category }) => {
    

    return (
        <motion.div transition={{duration: 0.5}} animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className='rounded'>
            <Link to={`/products/${_id}`} className='text-decoration-none'>
                <section className="shadow p-3 d-flex flex-column gap-2 contentsec position-relative rounded">
                    
                    <div className="ratio ratio-4x3 ">
                        <img src={imageUrl} className="img-fluid object-fit-contain rounded" alt="product image" />
                    </div>
                    <p className="section-p text-decoration-none my-2">{category.name}</p>
                    <h5 className="desiredH5 text-decoration-none clamped-text-2" >{name} - {code}</h5>
                    <p className="section-p text-decoration-none clamped-text-2">{description}</p>
                    
                    <a className="desiredBtn linkFix text-center mt-auto" href={`/products/${_id}`}>Check Product</a>
                </section>
            </Link>
        </motion.div>



    )
}



