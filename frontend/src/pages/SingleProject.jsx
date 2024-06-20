import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

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

        const res = await fetch(`/api/projects/${params.id}`);
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

  return (
    <>


      <section id="projects" class="container">

        <div class="row text-center mt-5">
          <div class="">
            <h2 class="section-p font-weight-bold mb-2">{project.title}</h2>
          </div>
        </div>
        <div class="row mx-auto">
          <div class="ratio ratio-21x9 mt-3 col-12">
            <img src={`${project.imageUrl}`} class="img-fluid object-fit-cover rounded" alt="" />
          </div>
        </div>

        <h6 className='section-p mt-2 font-weight-bold ms-2'>{formatDate(project.createdAt)} - {project.country}</h6>

        <p className='section-p ms-2'>
          {project.desc}
        </p>
        <div class="row mt-3">
          <div class="col-12">
            <a href="/projects" class=" btn desiredBtn w-100">Other Projects</a>
          </div>

        </div>

      </section>

    </>

  )
}
