import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./components/Routing";
import { SidebarProvider } from "./components/sidebarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <Routing />
  </SidebarProvider>
);

// domain: "dev-zteqhri2btzuf6hl.us.auth0.com",
// clientId: "Cz3lKocVPMzFieF7xFxlrHhCKcnQjxM2"

//Check this out when finished with code, maybe sidebarprovider should go into routing
