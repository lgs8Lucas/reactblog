import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

import { AuthProvider } from "./context/AuthContext";

import BlogRoutes from "./BlogRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() =>{
    onAuthStateChanged(auth, (user) => setUser(user)); 
    //Se o usuario estiver autenticado, pega ela, caso contrário define como false
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <BlogRoutes />
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
