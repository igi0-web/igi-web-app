import './styles/contactUs.css'
import { ContactCard } from '../components/ContactCard';
import { faPhone, faMapMarkerAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import backImage from '../assets/pages/contactus/1.jpg'
import { useEffect, useState } from 'react';
export const ContactUs = () => {
  const [cprofile, setCprofile] = useState({});

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/cprofile");
      const profile = await res.json();
      if (profile.success == false) {
      
        return;
      }
      setCprofile(profile);
    } catch (error) {
      
      console.log(error.message);
    }
  }
  useEffect(() => {
    
    fetchProfile();

  }, []);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(formData.subject);
    const emailBody = encodeURIComponent(formData.message);
    const mailtoLink = `mailto:${cprofile.email}?subject=${emailSubject}&body=Name: ${formData.name}%0A%0ADescription: ${emailBody}`;

    
    window.open(mailtoLink, '_blank');
    console.log('Form submitted:', formData);
    
    setFormData({ name: '', subject: '', message: '' });
  };


  return (
    <>
      <div className='d-flex align-items-center justify-content-center text-light' style={{
        backgroundImage: `url(${backImage})`, backgroundSize: 'cover',
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: "300px"
      }}>
        <h1>CONTACT US</h1>
      </div>

      <section id="direct-contact-us-section" className="container justify-content-center ">

        <div className="row text-center mt-3 mb-3">
          <div className="col-12">
            <h2 className="section-p">Directly</h2>
          </div>
        </div>

        <div className="row gap-lg-1 justify-content-center">

          <ContactCard title="CALL US"
            icon={faPhone}
            data={cprofile.phoneNumber} />

          <ContactCard title="EMAIL US" icon={faEnvelope} data={cprofile.email} />

        </div>

        <div className="row mb-3 gap-lg-1 justify-content-center">

          <ContactCard title="FIND US" icon={faMapMarkerAlt} data={cprofile.Address} location={cprofile.location} />

          <ContactCard title="OPEN DAYS" icon={faClock} data="Every day excluding major holidays" />

        </div>
        <hr className="container my-5" />


      </section>



      <section id="contact-form-section" className="container">


        <div className="row text-center mt-3 mb-3">

          <div className="col-12">
            <h2 className="section-p">Get In Touch</h2>
          </div>

        </div>

        <div
          className="row mb-3 justify-content-center gap-3 gap-lg-0">
          <div className="col-10">
            <input name='name' type="text" className="shadow form-control rounded"
              placeholder="Name" required value={formData.name} onChange={handleInputChange} />
          </div>
        </div>

        <div className="row mb-3 justify-content-center" >

          <div className="col-10">
            <input name='subject' type="text" className="shadow form-control rounded"
              placeholder="Subject" required value={formData.subject} onChange={handleInputChange} />
          </div>

        </div>

        <div className="row mb-3 justify-content-center" >

          <div className="col-10">
            <textarea className="shadow form-control rounded" name="message" id="" cols="30"
              rows="10" placeholder="Type Message" value={formData.message} required onChange={handleInputChange}></textarea>
          </div>

        </div>

        <div className="row mb-3 mb-5 justify-content-center ">

          <div className="col-10 text-end" >
            <a target="_blank" className="desiredBtn text-decoration-none" onClick={handleSubmit}>Submit</a>
          </div>

        </div>

      </section>


      <hr className="container my-5" />
      <div className="text-center mb-3">
        <h2 className="section-p">Visit Us</h2>
      </div>

      <section className='d-flex justify-content-center'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d207.35983060011867!2d35.45437101777217!3d33.741091730219736!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d33.741119331500755!2d35.454346207338496!5e0!3m2!1sen!2slb!4v1718721748426!5m2!1sen!2slb" className='container' width="400" height="400" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </section>

    </>
    // 
  );
}
