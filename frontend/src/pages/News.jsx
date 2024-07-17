import React, { useEffect, useState } from 'react'
import backImage from '../assets/pages/news/1.jpg'
import { NewsCard } from '../components/NewsCard';
import { Row, Col } from "react-bootstrap"
import Loader from '../components/Loader';

export const News = () => {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState("");

  const fetchAllNews = async () => {

    try {

      setLoading(true)
      setError("")
      const res = await fetch(`https://igi-web-app.onrender.com/api/news?limit=10`);
      const data = await res.json();

      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }

      if (data.length > 9) {

        const firstNineElements = data.slice(0, 9);
        setNews(firstNineElements);
        setShowMore(true);
        setLoading(false)
      } else {
        setNews(data);
        setShowMore(false);
        setLoading(false)
      }

    } catch (error) {
      setLoading(false)
      setError("Failed to fetch news!"+error.message);
    
    }
  }

  useEffect(() => {
    fetchAllNews();
  }, []);

  const onShowMoreClick = async () => {
    try {
      setLoading(true)
      const numberOfEvents = news.length;
      const startIndex = numberOfEvents;
      const res = await fetch(`/api/news/?startIndex=${startIndex}&limit=10`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }
      if (data.length > 9) {
        const firstNineElements = data.slice(0, 9);
        setNews(prevNews => [...prevNews, ...firstNineElements]);
        setShowMore(true);
        setLoading(false)
      } else {
        setNews(prevNews => [...prevNews, ...data]);
        setShowMore(false);
        setLoading(false)
      }
    } catch (error) {
      console.error("Failed to fetch more events:", error);
      setError("Failed to fetch more events:"+ error)
      setLoading(false)
    }
  };

  return (
    <>

      <div className='d-flex align-items-center justify-content-center text-light' style={{
        backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: "300px"
      }}>
        <h1 className='fw-bold'>NEWS & EVENTS</h1>
      </div>

      

      <section className='container my-5'>
      {error && <p className="text-danger text-center">{error}</p>}
        <Row>

          {
            news.map((event) => {
              return (
                <Col className="mb-3" key={event._id} sm={12} md={6} lg={7} xl={4}>
                  <NewsCard
                    {...event}
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
