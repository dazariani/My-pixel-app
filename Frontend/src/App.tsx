import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "styled-components";
import Home from "./pages/home/Home";
import Collections from "./pages/collections/Collections";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/collection/Collection";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Image from "./pages/image/Image";

interface ThemeType {
  black: string;
  dark_grey: string;
  light_grey: string;
  white: string;
}

const theme: ThemeType = {
  black: "#121826",
  dark_grey: "#6C727F",
  light_grey: "#E5E7EB",
  white: "#FFFFFF",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id" element={<Collection />} />
        <Route path="/:id" element={<Image />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
