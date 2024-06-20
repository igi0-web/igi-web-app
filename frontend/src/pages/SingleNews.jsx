import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export const SingleNews = () => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString();
    };
    const params = useParams();
    const [event, setEvent] = useState({});
    console.log(event);

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {

                const res = await fetch(`/api/news/${params.id}`);
                const data = await res.json();
                if (data.success === false) {

                    return;
                }
                setEvent(data);

            } catch (error) {
                console.log(error.message);
            }
        };
        fetchSingleEvent();
    }, [params.id]);

    return (
        <>


            <section id="news" class="container">
                <div style={{ width: "70%", marginLeft: "15%", marginTop: "1%" }}>
                    <div class="row text-center mt-5">
                        <div class="">
                            <h2 class="section-p font-weight-bold mb-2">{event.title}</h2>
                        </div>
                    </div>
                </div>
                <div class="row mx-auto">
                    <div class="ratio ratio-21x9 mt-3 col-12">
                        <img src={`${event.imageUrl}`} class="img-fluid object-fit-contain rounded" alt="" />
                    </div>
                </div>
                <div style={{ width: "70%", marginLeft: "15%", marginTop: "1%" }}>
                    <h6 className='section-p mt-2 font-weight-bold'>This event was held on: {formatDate(event.createdAt)}</h6>

                    <p className='section-p'>
                        {event.desc}
                    </p>
                    <div class="row mt-3">
                        <div class="col-12">
                            <a href="/news" class=" btn desiredBtn w-100">Other Events</a>
                        </div>

                    </div>
                </div>
            </section>

        </>

    )
}
