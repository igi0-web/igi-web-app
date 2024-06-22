import "./styles/components.css";
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
export const Footer = () => {
    const [cprofile, setCprofile] = useState({});
    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/cprofile");
            const profile = await res.json();
            if (profile.success == false) {

                return;
            }
            setCprofile(profile);
        } catch (error) {

            console.log(error.message);
        }
    }
    useEffect(() => {

        fetchProfile();

    }, []);


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
                                className="linkFix p-0 ">News & Events</a></li>
                            <li className="mb-2 footer-p-white"><a href="/about-us" className=" p-0 linkFix">About
                                Us</a></li>
                            <li className="mb-2 footer-p-white"><a href="/contact-us"
                                className="linkFix p-0 ">Contact Us</a></li>
                            <li className="mb-2 footer-p-white"><a href="/login"
                                className="linkFix p-0 ">Admin</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 mb-3">

                        <h5 className="footerH5-white">LET'S CONNECT ON SOCIAL MEDIA</h5>
                        <p className="footer-p-white">Stay tuned with exclusive news and updates.</p>
                        <div className="d-flex gap-3">
                            <a href={`tel:${cprofile.phoneNumber}`}><FontAwesomeIcon className="icon" icon={faPhone} size="2x" color="#fff" /></a>
                            <a href={cprofile.facebook}><FontAwesomeIcon className="icon" icon={faFacebook} size="2x" color="#fff" /></a>
                            <a href={cprofile.instagram}><FontAwesomeIcon className="icon" icon={faInstagram} size="2x" color="#fff" /></a>
                            <a href={cprofile.linkedin}><FontAwesomeIcon className="icon" icon={faLinkedin} size="2x" color="#fff" /></a>
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
