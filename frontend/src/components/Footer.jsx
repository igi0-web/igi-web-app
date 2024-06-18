import "./styles/components.css";

export const Footer = () => {
  return (
        <section id="footer-section" className="container-fluid coloredBackground mt-5 ">

            <footer className="pt-5 pb-2 container">

                <div className="row g-sm-3 g-md-3 g-lg-5">

                    <div className="col-12 col-md-12 col-lg-5 mb-3">

                        <h5 className="footerH5-white">INTERNATIONAL GROUP INDUSTRIES</h5>
                        <p className="footer-p-white">
                            IGI team works hard to meet customer satisfaction by implementing the basic standards of
                            HVAC
                            products. We communicate directly with our customers via the internet or by phone so we
                            always
                            can understand their needs.
                        </p>
                        
                    </div>
                    <div className="col-12 col-md-12 col-lg-3 mb-3">

                        <h5 className="footerH5-white">NAVIGATE</h5>
                        <ul className="nav flex-column">
                            <li className="mb-2 footer-p-white"><a href="/" className="linkFix p-0 ">Home</a></li>
                            <li className="mb-2 footer-p-white"><a href="/products"
                                    className="linkFix p-0 ">Products</a></li>
                            <li className="mb-2 footer-p-white"><a href="/projects"
                                    className="linkFix p-0 ">Projects</a></li>
                            <li className="mb-2 footer-p-white"><a href="/certificates"
                                    className="linkFix p-0 ">Certificates</a></li>
                                    <li className="mb-2 footer-p-white"><a href="/news"
                                    className="linkFix p-0 ">News</a></li>
                            <li className="mb-2 footer-p-white"><a href="/about-us" className=" p-0 linkFix">About
                                    Us</a></li>
                            <li className="mb-2 footer-p-white"><a href="/contact-us"
                                    className="linkFix p-0 ">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 mb-3">

                        <h5 className="footerH5-white">LET'S CONNECT ON SOCIAL MEDIA</h5>
                            <p className="footer-p-white">Stay tuned with exclusive news and updates.</p>
                            <div className="d-flex gap-3">
                                
                            </div>

                    </div>

                </div>

                <hr className="text-light" />

                <div>
                    <p className="footer-p-white">Copyright © IGI. All Rights Reserved.</p>
                </div>

            </footer>

        </section>
        
   
  )
}
