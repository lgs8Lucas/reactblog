import "./App.css";
import { BrowserRouter } from "react-router-dom";
import BlogRoutes from "./BlogRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <BlogRoutes/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
