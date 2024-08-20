import "./Home.css";

const Home = () => {
  return (
      <div className="home position-relative">
        <div className="position-absolute top-50 start-50 translate-middle">
          <p className="display-4 fw-bold fst-italic">WELCOME TO AGRO GENIUS</p>
          <p className="fw-semibold">
          “Cultivating tomorrow, one seed at a time.”
          </p>
        </div>
      </div>
  );
};

export default Home;

// align-items-center   justify-content-md-center
