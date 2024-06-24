import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'; 

const ReturnToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    
  }, []);

  return (
    <Button
      variant="primary"
      className="return-to-top"
      onClick={scrollToTop}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </Button>
  );
};

export default ReturnToTop;
