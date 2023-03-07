import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AppProvider from "./AppContext/Provider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      
        <AppProvider>
          <Routes>

            <Route path="/" element={<Login/>}/>
            <Route path="/sign-up" element={<Signup/>}/>




          </Routes>
        </AppProvider>
     
    </BrowserRouter>
  );
}

export default App;


