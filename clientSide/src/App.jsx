import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import CreateListing from "./pages/CreateListing"
import Header from "./components/Header"
import Listing from "./pages/Listing"
import SignUpModal from "./components/SignUpModal";
import { useState } from "react"
import SignInModal from "./components/SignInModal"
import { PrivateRoute } from "./components/PrivateRoute"
import UpdateListing from "./pages/UpdateListing"

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
      <Route path="/listing/:listingId" element={<Listing/>}/>

      {/* profile route is inside PrivateRoute so that it can only accessible
          when user is signed in.
       */}
      <Route element={<PrivateRoute openSignIn={openSignInModal}/>}>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
      </Route>
    </Routes>
    <SignUpModal isOpen={isSignUpModalOpen} onClose={closeSignUpModal} openSignIn={openSignInModal}/>
    <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} openSignUp={openSignUpModal}/>
    </BrowserRouter>
  )
}

export default App
