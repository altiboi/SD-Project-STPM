import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./components/Routing1";
//import './index.css'
import { SidebarProvider } from "./components/sidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <Routing />
  </SidebarProvider>
);