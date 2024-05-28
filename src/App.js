import { useContext, useEffect } from "react";
import CreatePost from "./pages/CreatePost";
import DetailPost from "./pages/DetailPost";
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import AuthCheck from "./AuthCheck";

const App = () => {
  return (
    
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/createpost" element={
      <AuthCheck>
    <CreatePost/>
    </AuthCheck>
    }/>
    <Route path="/view-post" element={<DetailPost/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}
export default App;