import "./styles/aboutUsComponents.css"

export const AboutUsLeft = ({ paragraph, title, imgSrc }) => {
    
    return (
        <div className="row align-items-center mb-5 mt-2 g-lg-5 mx-auto">

            <div className="col-12 col-lg-6">
                <h2 className="section-heading my-4 text-md-start text-lg-start">{title}</h2>
                <p className="section-p ">{paragraph}

                </p>
            </div>

            <div className="col-12 col-lg-6  mx-auto aboutImg">
                <img src={`${imgSrc}`} className="rounded img-fluid" alt="image missing" />
            </div>

        </div>
    )
}
