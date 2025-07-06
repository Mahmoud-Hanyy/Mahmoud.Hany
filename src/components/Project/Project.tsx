import { Container } from "./styles";
import githubIcon from "../../assets/github.png";
import externalLink from "../../assets/external.png";
import ScrollAnimation from "react-animate-on-scroll";

export function Project() {
  return (
    <Container id="project">
      <h2>My Projects</h2>
      <div className="projects">
        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <div className="project-links">
                <a
                  href="https://github.com/Mahmoud-Hanyy/Volt"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" />
                </a>
                <a
                  href="https://volt-neon.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={externalLink} alt="Visit site" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>Volt - Ecommerce for electronics</h3>
              <p>
                Volt is a modern, responsive e-commerce web application for
                browsing and purchasing electronics. Built with React and
                Bootstrap, Volt features clean UI, cart management, and seamless
                integration with a product API. Designed for performance across
                all screen sizes.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>React JS</li>
                <li>Bootstrap 5 (CSS)</li>
                <li>HTML5</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <div className="project-links">
                <a
                  href="https://github.com/Mahmoud-Hanyy/SceneSmith"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="Visit site" />
                </a>
                <a
                  href="https://scene-smith-cw1s.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={externalLink} alt="Visit site" />
                </a>
              </div>
            </header>
            <div className="body">
              <h3>SceneSmith - Movies and Shows App</h3>
              <p>
                SceneSmith is a responsive movie app built with React.js and
                Bootstrap. Discover trending movies, search by title, and view
                details like ratings and overviews. Smooth animations and a
                modern UI ensure a great user experience across all devices.
              </p>
            </div>
            <footer>
              {" "}
              <ul className="tech-list">
                {" "}
                <li>React JS</li> <li>Bootstrap 5 (CSS)</li> <li>HTML5</li>{" "}
              </ul>{" "}
            </footer>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animateIn="flipInX">
          <div className="project">
            <header>
              <div className="project-links">
                <a
                  href="https://github.com/Mahmoud-Hanyy/BookStore"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={githubIcon} alt="Visit site" />{" "}
                </a>
              </div>
            </header>
            <div className="body">
              <h3>BookStore</h3>
              <p>
                A full-stack Django web app for managing a book collection with
                full CRUD operations, responsive Tailwind CSS design, and clean
                UI. Built using the MTV architecture to demonstrate core web
                development concepts.
              </p>
            </div>
            <footer>
              <ul className="tech-list">
                <li>Python</li>
                <li>Django</li>
                <li>HTML5</li>
                <li>Tailwind</li>
              </ul>
            </footer>
          </div>
        </ScrollAnimation>
      </div>
    </Container>
  );
}
