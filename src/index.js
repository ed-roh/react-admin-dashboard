import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyAewUafh9Zc8zRskL8XqEU6BiZ7Jt0ekF0",
  authDomain: "plataforma-tcc.firebaseapp.com",
  projectId: "plataforma-tcc",
  storageBucket: "plataforma-tcc.appspot.com",
  messagingSenderId: "596401691762",
  appId: "1:596401691762:web:3d3c070ac1806ba80f36eb"
};

const firebaseApp = initializeApp(firebaseConfig);

register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
