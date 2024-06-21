import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AboutCompany = ({icon, h2, p}) => {
  return (
    <div class="col-12 col-lg-4 text-center">
          <FontAwesomeIcon icon={icon} size="4x" color="rgb(44, 116, 179)" />
            <h2 class="pop desiredH2">{h2}</h2>
            <p class="pop aboutUs-section-p">{p}</p>
          </div>
  )
}
