import { useEffect, useState } from "react"
import backImage from "../assets/pages/certificates/background.png"
import { Row, Col } from "react-bootstrap"
import { CertificateCard } from "../components/CertificateCard"
import Loader from "../components/Loader"

export const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [statusCode, setStatusCode] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllCertificates = async () => {
      try {

        const res = await fetch(`/api/certificates?limit=10`);
        const data = await res.json();
        if (data.success === false) {
          setStatusCode(data.statusCode);
          console.log(data.message);
          return;
        }
        if (data.length > 9) {

          const firstNineElements = data.slice(0, 9);
          setCertificates(firstNineElements);
          setShowMore(true);
          setLoading(false)
        } else {
          setCertificates(data);
          setShowMore(false);
          setLoading(false)
        }


      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAllCertificates();
  }, []);

  if (certificates.length == 0 && statusCode != 404) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Loader />
      </div>
    );
  }

  const onShowMoreClick = async () => {
    try {
      setLoading(true)
      const numberOfCertificates = certificates.length;
      const startIndex = numberOfCertificates;
      const res = await fetch(`/api/certificates/?startIndex=${startIndex}&limit=10`);
      const data = await res.json();

      if (data.length > 9) {
        const firstNineElements = data.slice(0, 9);
        setCertificates(prevCertificates => [...prevCertificates, ...firstNineElements]);
        setShowMore(true);
        setLoading(false)
      } else {
        setCertificates(prevCertificates => [...prevCertificates, ...data]);
        setShowMore(false);
        setLoading(false)
      }
    } catch (error) {
      console.error("Failed to fetch more certificates:", error);

      setLoading(false)
    }
  };
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
        {
          loading == true ? <Loader /> : (
            <div className='d-flex align-items-center justify-content-center'>
              {showMore && loading == false && (
                <button
                  onClick={onShowMoreClick}
                  className="desiredBtn"
                >
                  Load More
                </button>
              )}
            </div>
          )
        }
      </section>
    </>




  )
}
