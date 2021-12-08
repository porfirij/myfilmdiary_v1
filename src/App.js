import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import LogIn from "./components/login/LogIn";
import LogOut from "./components/logout/LogOut";
import SignUp from "./components/signup/SignUp";
import VerifyEmail from "./components/signup/VerifyEmail";
import ResetPsw from "./components/login/ResetPsw";
import Main from "./components/main/Main2";
import NotFound from "./components/notfound/NotFound";

import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <Router>
      <section className="w-full px-8 text-gray-700 bg-gradient-to-b from-gray-100 to-gray-300">
        <Header />
      </section>

      <section className="w-full px-8 py-10 bg-gray-100 xl:px-8">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/resetpsw" element={<ResetPsw />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>

      <section className="text-gray-700 bg-white body-font">
        <Footer />
      </section>
    </Router>
  );
}
