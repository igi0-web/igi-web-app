
import "../index.css"
import { ImageContainer } from "./ImageContainer";


export const CertificateCard = ({imageUrl, title, createdAt, blurhash}) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString();
    };

    return (
        <div className='rounded'>

            <section className="shadow-sm p-3 d-flex flex-column gap-2 contentsec position-relative rounded">

                
                <ImageContainer imageUrl={imageUrl} blurHash={blurhash} type="cer" />
                <h5 className="desiredH5 text-decoration-none clamped-text-2">{title}</h5>
                <p className="section-p text-decoration-none">{formatDate(createdAt)}</p>
                
            </section>

        </div>



    )
}
