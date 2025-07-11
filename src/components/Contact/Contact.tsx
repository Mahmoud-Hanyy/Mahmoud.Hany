import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";


export function Contact(){

  return(
    <Container id="contact">
      <header>
        <h2>Contact</h2>
        <p>Ready to get started on your project? </p>
        <p>Contact me now for a Free consultation.</p>
      </header>
      <div className="contacts">
        <div>
        <a href="mailto:mahmoud.hany.mahmoud@outlook.com"><img src={emailIcon} alt="Email"/></a> 
          <a href="mailto:mahmoud.hany.mahmoud@outlook.com">mahmoud.hany.mahmoud@outlook.com</a>
        </div> 
      </div>
    </Container>
  )
}