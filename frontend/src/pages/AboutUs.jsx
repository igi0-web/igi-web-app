import { AboutUsLeft } from "../components/AboutUsLeft"
import { AboutUsRight } from "../components/AboutUsRight"
import aboutUs1 from "../assets/pages/aboutus/aboutus1.jpg"
import aboutUs2 from "../assets/pages/aboutus/aboutus2.jpg"
import aboutUs3 from "../assets/pages/aboutus/aboutus3.jpg"
export const AboutUs = () => {
  
  
  return (
    <section id="about-us-section" class="container py-lg-5 ">
      <AboutUsLeft paragraph="IGI is a manufacturer of air movement products founded by Mahmoud R. Al Helo
            in
            2000. With over 37 years of experience, IGI has equipped itself as a trusted name in the
            industry, committed to delivering top - quality products and unparalleled customer service." title="About Us" imgSrc={aboutUs1} />


      <hr />


      <AboutUsRight paragraph="Our mission is to design, develop, and manufacture innovative air movement
              solutions of the highest quality." title="Our Mission" imgSrc={aboutUs2} />

      <hr />



      <AboutUsLeft title="Our Vision" paragraph="Our vision is to become the leading global source for air movement products. We
                aim to achieve this by continuously improving our processes and leveraging the latest
                technologies to stay ahead of the curve." imgSrc={aboutUs3} />

    </section>
  )
}
