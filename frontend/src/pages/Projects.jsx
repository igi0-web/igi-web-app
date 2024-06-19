import backImage from "../assets/pages/projects/background.jpeg"

export const Projects = () => {
  return (
    <div className='d-flex align-items-center justify-content-center text-light' style={{
      backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
      backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: "300px"
    }}>
      <h1 className="fw-bold">PROJECTS</h1>
    </div>
  )
}
