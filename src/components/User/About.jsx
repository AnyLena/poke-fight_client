import "../../styles/about.css";
import trainer1 from "../../assets/trainer1.png";
import trainer2 from "../../assets/trainer2.png";
import catchSilver from "../../assets/badges/fight-badge_silver.png";
const About = () => {
  return (
    <section className="about">
      <h1>About Us</h1>
      <div className="flex-container">
        <section className="profile">
          <div className="left">
            <img src={trainer1} alt="trainer" />
          </div>

          <div className="right">
            <div className="user-info">
              <h2>Programmer Stats</h2>
              <h3>Name</h3>
              <p>Néstor</p>
              <h3>Your Adventure started on</h3>
              <p>03/11/2023</p>
              <h3>Néstor's GitHub</h3>
              <a
                href="https://github.com/nestoririondo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="git-badge">
                  <img id="badge" src={catchSilver} alt="To GitHub" />
                  <p>nestoririondo</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="profile">
          <div className="right">
            <div className="user-info">
              <h2>Programmer Stats</h2>
              <h3>Name</h3>
              <p>Lena</p>
              <h3>Your Adventure started on</h3>
              <p>03/11/2023</p>
              <h3>Lenas's GitHub</h3>
              <a
                href="https://github.com/AnyLena"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="git-badge">
                  <img id="badge" src={catchSilver} alt="To GitHub" />
                  <p>AnyLena</p>
                </div>
              </a>
            </div>
          </div>
          <div className="left">
            <img src={trainer2} alt="trainer" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
