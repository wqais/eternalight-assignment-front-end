import React from "react";
import { createRoot } from "react-dom/client";
import Register from "./components/register/register.js";
import Login from "./components/login/login.js";
import Home from "./components/home/home.js";
import Profile from "./components/profile/profile.js";
import Logout from "./components/logout/logout.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

root.render(<App />);
