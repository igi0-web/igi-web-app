import './styles/contactCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const ContactCard = ({title, icon, data, location}) => {
  return (
    <section
        className="col-10 col-lg-5 shadow-sm p-5 rounded">
        <FontAwesomeIcon icon={icon} size="2x" color="rgb(44, 116, 179)" />
        <h6 className="my-3 fw-bold h6Color">{title}</h6>
        {title === "EMAIL US" && <a href={`mailto:${data}`} className="contact-link">{data}</a> }
        {title === "CALL US" && <a href={`tel:${data}`} className="contact-link">{data}</a> }
        {title === "FIND US" && <a href={`${location}`} target="_blank" className="contact-link">{data}</a> }
        {title === "OPEN DAYS" && <a className="contact-link">{data}</a> }
    </section>
  )
}
