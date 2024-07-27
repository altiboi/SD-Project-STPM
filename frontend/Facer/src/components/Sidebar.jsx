import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { navigationLinks } from "../data/data";
import { SidebarContext } from "./sidebarContext";
import profilePic from "../assets/Lusanda.jpg";

const Sidebar = ({ dashboardActiveLinkIdx, setDashboardActiveLinkIdx, notificationsCount }) => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  const handleItemClick = (index) => {
    setActiveLinkIdx(index);
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={profilePic} alt="Profile Picture" />
        </div>
        <span className="info-name">Lusanda Shongwe</span>
      </div>
      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink, index) => (
            <li className="nav-item" key={navigationLink.id}>
              <a
                href="#"
                className={`nav-link ${
                  index === activeLinkIdx ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(index);
                  setDashboardActiveLinkIdx(index);
                }}
              >

                <div className="icon">

                <img
                  src={navigationLink.image}
                  alt="nav-image"
                  className="nav-link-icon"
                />

                  {index === 4 && notificationsCount > 0 && (
                    <div className="counter">{notificationsCount}</div>
                  )}




                </div>
                
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
