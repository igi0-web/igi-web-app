import backImage from "../assets/pages/projects/background.jpeg"
import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap"
import { ProjectCard } from "../components/ProjectCard"
import Loader from "../components/Loader"
export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [statusCode, setStatusCode] = useState("");
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        
        const res = await fetch(`/api/projects/`);
        const data = await res.json();
        if (data.success === false) {
          setStatusCode(data.statusCode)
          console.log(data.statusCode);
          console.log(data.message);
          
          return;
        }
        setProjects(data);
        
      } catch (error) {
        
        console.log(error.message);
      }
    }
    fetchAllProjects();
  }, []);
  console.log(statusCode);
  if (projects.length === 0 && statusCode != 404) {
    console.log(statusCode);
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
        <h1 className="fw-bold">PROJECTS</h1>
      </div>
      <section className='container my-5'>

        <Row>

          {
            projects.map((proj) => {
              return (
                <Col className="mb-3" key={proj._id} sm={12} md={6} lg={7} xl={4}>
                  <ProjectCard
                    {...proj}
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
