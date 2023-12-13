import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./components/PrivateRoutes";
import localStorageService from "./services/localStorageService";

function App() {
  const [role, setRole] = useState(localStorageService.getRole());
  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route exac path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes> */}
      <PrivateRoutes role={role} setRole={setRole} />
    </>
  );
}

export default App;
