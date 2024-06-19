import backImage from "../assets/pages/certificates/background.png"

export const Certificates = () => {
  return (
    <div className='d-flex align-items-center justify-content-center text-light' style={{
      backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
      backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: "300px"
    }}>
      <h1 className="fw-bold">CERTIFICATES</h1>
    </div>
  )
}
