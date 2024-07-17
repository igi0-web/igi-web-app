import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Col, Container, Row } from 'react-bootstrap';

export const SingleProject = () => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };
  const params = useParams();
  const [project, setProject] = useState({});
  console.log(project);

  useEffect(() => {
    const fetchSingleProject = async () => {
      try {

        const res = await fetch(`https://igi-web-app.onrender.com/api/projects/${params.id}`);
        const data = await res.json();
        if (data.success === false) {

          return;
        }
        setProject(data);

      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSingleProject();
  }, [params.id]);
  if (Object.values(project).length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <Container className="p-4 section-p my-5">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center mb-4 mb-md-0">
            <img
              src={`${project.imageUrl}`}
              alt={project.title}
              fluid
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              className="project-image"
            />
          </Col>
          <Col xs={12} md={6}>
            <h1>{project.title}</h1>

            <p className='text-secondary'>{project.desc}</p>
            <h5>{formatDate(project.createdAt)} - {project.country}</h5>
          </Col>
        </Row>
        <div class="row mt-3">
          <div class="col-12">
            <a href="/projects" class=" btn desiredBtn w-100">Other Projects</a>
          </div>

        </div>
      </Container>



    </>

  )
}
