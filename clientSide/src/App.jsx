import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import SignUpModal from "./components/SignUpModal";
import { useState } from "react"
import SignInModal from "./components/SignInModal"

const App = () => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  // open the sign up modal
  const openSignUpModal = () => {
    setSignInModalOpen(false);
    return setSignUpModalOpen(true)
  };

  // close the sing up modal
  const closeSignUpModal = (data) => {
    if (data) {
      if (data.success === true) {
        setSignUpModalOpen(false);
        setSignInModalOpen(true);
      }
    }
    setSignUpModalOpen(false);
  };

  // open sign in modal
  const openSignInModal = () => {
    console.log('Should open sign in modal and close sign up modal');
    setSignUpModalOpen(false);
    return setSignInModalOpen(true);
  }

  // close sing in modal
  const closeSignInModal = () => setSignInModalOpen(false);

  return (
    <BrowserRouter>
    <Header openSignUpModal={openSignUpModal} openSignInModal={openSignInModal}/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />}/>
    </Routes>
    <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} openSignIn={openSignInModal}/>
    <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} openSignUp={openSignUpModal}/>
    </BrowserRouter>
  )
}

export default App
