import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./AppContext/Provider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";
import TrendingPage from "./pages/TrendingPage";
import 'react-tooltip/dist/react-tooltip.css';
import Profile from "./pages/Profile";
import { ModalProvider } from 'styled-react-modal'
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>

      <AppProvider>
      <ModalProvider backgroundComponent={SpecialModalBackground}>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />

            <Route path="/timeline" element={<Timeline />} />
            <Route path="/hashtag/:hashtag" element={<TrendingPage />} />

            <Route path="/user/:id" element={<Profile />} />


          </Routes>
        </ModalProvider>

      </AppProvider>

    </BrowserRouter>
  );
}

export default App;


const SpecialModalBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  background-color: rgba(255, 255, 255, 0.9);
`