import { Navbar } from "./components/landingPage/NavBar";
import { Footer } from "./components/landingPage/Footer";
import LandingPage from "./components/landingPage";
import SignupPage from "./pages/auth/signup-page";
import SigninPage from "./pages/auth/signin-page";
import ProblemsPage from "./pages/problems";
import ProblemPage from "./pages/problem";
import { Routes, Route } from "react-router";
import InterviewPage from "./pages/interview";
import Interviews from "./pages/interviews";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/interview/:id" element={<Interviews />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
