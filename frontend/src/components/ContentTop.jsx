import { iconsImgs } from "../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "./sidebarContext";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left"></div>
      <div className="content-top-btns"></div>
    </div>
  );
};

export default ContentTop;
