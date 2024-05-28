import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Context,{ FirebaseContext } from "./store/FirebaseContext";
import {firebase,firestore,db,storage} from "./firebase/config";
import PostCont from "./store/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{firebase,firestore,db,storage}}>
    <Context>
    <PostCont>
    <App />
    </PostCont>
    </Context>
  </FirebaseContext.Provider>
);
