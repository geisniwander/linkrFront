import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AppProvider from "./AppContext/Provider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";
import TrendingPage from "./pages/TrendingPage";
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  return (
    <BrowserRouter>
      
        <AppProvider>
          <Routes>

            <Route path="/" element={<Login/>}/>
            <Route path="/sign-up" element={<Signup/>}/>

            <Route path="/timeline" element={<Timeline />} />
            <Route path="/hashtag/:hashtag" element={<TrendingPage />} />


          </Routes>
        </AppProvider>
     
    </BrowserRouter>
  );
}

export default App;


