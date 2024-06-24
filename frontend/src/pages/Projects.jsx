import backImage from "../assets/pages/projects/background.jpeg"
import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap"
import { ProjectCard } from "../components/ProjectCard"
import Loader from "../components/Loader"
export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [statusCode, setStatusCode] = useState("");
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {

        const res = await fetch(`/api/projects?limit=10`);
        const data = await res.json();
        if (data.success === false) {
          setStatusCode(data.statusCode)
          console.log(data.statusCode);
          console.log(data.message);

          return;
        }
        if (data.length > 9) {

          const firstNineElements = data.slice(0, 9);
          setProjects(firstNineElements);
          setShowMore(true);
          setLoading(false)
        } else {
          setProjects(data);
          setShowMore(false);
          setLoading(false)
        }


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

  const onShowMoreClick = async () => {
    try {
      setLoading(true)
      const numberOfProjects = projects.length;
      const startIndex = numberOfProjects;
      const res = await fetch(`/api/projects/?startIndex=${startIndex}&limit=10`);
      const data = await res.json();

      if (data.length > 9) {
        const firstNineElements = data.slice(0, 9);
        setProjects(prevProjects => [...prevProjects, ...firstNineElements]);
        setShowMore(true);
        setLoading(false)
      } else {
        setProjects(prevProjects => [...prevProjects, ...data]);
        setShowMore(false);
        setLoading(false)
      }
    } catch (error) {
      console.error("Failed to fetch more projects:", error);

      setLoading(false)
    }
  };
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
