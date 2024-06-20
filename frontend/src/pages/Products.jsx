import backImage from "../assets/pages/products/background.jpg"

export const Products = () => {
  return (
    <div className='d-flex align-items-center justify-content-center text-light' style={{
      backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
      backgroundPosition: 'top', backgroundRepeat: 'no-repeat', height: "300px"
    }}>
      <h1 className="fw-bold">PRODUCTS</h1>
    </div>
  )
}
