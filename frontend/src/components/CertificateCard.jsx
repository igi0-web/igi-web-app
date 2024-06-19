
import "../index.css"


export const CertificateCard = ({imageUrl, title, createdAt}) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString();
    };

    return (
        <div className='rounded'>

            <section className="shadow p-3 d-flex flex-column gap-2 contentsec position-relative rounded">

                <div className="ratio ratio-4x3 image-container">
                    <img src={imageUrl} className="img-fluid object-fit-cover rounded top-focused" alt="certificate image" />
                </div>
                <h5 className="desiredH5 text-decoration-none clamped-text-2">{title}</h5>
                <p className="section-p text-decoration-none">{formatDate(createdAt)}</p>
                
            </section>

        </div>



    )
}
