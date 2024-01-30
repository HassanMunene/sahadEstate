import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import SignUpModal from "./components/SignUpModal";
import { useState } from "react"

const App = () => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);
  return (
    <BrowserRouter>
    <Header openSignUpModal={openSignUpModal} />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />}/>
    </Routes>
    <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal}/>
    </BrowserRouter>
  )
}

export default App
