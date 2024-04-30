import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { navigationLinks } from "../data/data";
import { SidebarContext } from "./sidebarContext";
import profilePic from "../assets/Lusanda.jpg";

const Sidebar = ({ activeLinkIdx, setActiveLinkIdx }) => {
  // Receive activeLinkIdx as prop
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={profilePic} alt="Profile Pictuer" />
        </div>
        <span className="info-name">Lusanda Shongwe</span>
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink, index) => (
            <li className="nav-item" key={navigationLink.id}>
              <a
                href="http://localhost:5173/dashboard#"
                className={`nav-link ${
                  index === activeLinkIdx ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLinkIdx(index);
                }} // Update active link index
              >
                <img
                  src={navigationLink.image}
                  alt="nav-image"
                  className="nav-link-icon"
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
