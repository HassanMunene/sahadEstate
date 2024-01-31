import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import SignUpModal from "./components/SignUpModal";
import { useState } from "react"
import SignInModal from "./components/SignInModal"

const App = () => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = (data) => {
    console.log(data);
    if (data.success === true) {
      setSignUpModalOpen(false);
      setSignInModalOpen(true);
    } else {
      return setSignUpModalOpen(true)
    }
  };

  const openSignInModal = () => setSignInModalOpen(true);
  const closeSignInModal = () => setSignInModalOpen(false);

  return (
    <BrowserRouter>
    <Header openSignUpModal={openSignUpModal} openSignInModal={openSignInModal}/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />}/>
    </Routes>
    <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal}/>
    <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal}/>
    </BrowserRouter>
  )
}

export default App
