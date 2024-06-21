import { useEffect, useState } from "react"
import backImage from "../assets/pages/certificates/background.png"
import { Row, Col } from "react-bootstrap"
import { CertificateCard } from "../components/CertificateCard"
import Loader from "../components/Loader"

export const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchAllCertificates = async () => {
      try {

        const res = await fetch(`/api/certificates/`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setCertificates(data);

      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAllCertificates();
  });

  if (certificates.length == 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className='d-flex align-items-center justify-content-center text-light' style={{
        backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: "300px"
      }}>
        <h1 className="fw-bold">CERTIFICATES</h1>
      </div>



      <section className='container my-5'>

        <Row>

          {
            certificates.map((cer) => {
              return (
                <Col className="mb-3" key={cer._id} sm={12} md={6} lg={7} xl={4}>
                  <CertificateCard
                    {...cer}
                  />
                </Col>
              )
            })
          }

        </Row>
      </section>
    </>




  )
}
