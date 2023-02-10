import "./App.css";
import AboutScreen from "./screens/AboutScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <b>d.e.c.k.y</b> Inspiration Board
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a href="/about">About </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<AboutScreen />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
