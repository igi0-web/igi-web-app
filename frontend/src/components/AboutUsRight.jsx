import "./styles/aboutUsComponents.css"

export const AboutUsRight = ({ paragraph, title, imgSrc }) => {
    
    return (
        <div className="row align-items-center my-5 g-lg-5 mx-auto">

            <div className="col-12 col-lg-6 aboutImg">
                <img src={`${imgSrc}`} className="rounded img-fluid" alt="image missing" />
            </div>

            <div className="col-12 col-lg-6">
                <h2 className="section-heading my-4 text-md-start text-lg-start">{title}</h2>
                <p className="section-p">{paragraph}</p>
            </div>

        </div>
    )
}
