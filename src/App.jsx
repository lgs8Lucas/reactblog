import "./App.css";
import { BrowserRouter } from "react-router-dom";
import BlogRoutes from "./BlogRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <BlogRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
