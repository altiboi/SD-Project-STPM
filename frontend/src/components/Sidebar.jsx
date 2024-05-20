import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
//import { navigationLinks } from "../data/data";
import { SidebarContext } from "./sidebarContext";
import profilePic from "../assets/Lusanda.jpg";
import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";
import { useAuth0 } from "@auth0/auth0-react";

let navigationLinks;

const Sidebar = ({ dashboardActiveLinkIdx, setDashboardActiveLinkIdx, userData, notificationsCount }) => {
  
  userData.role == "Resident" ? navigationLinks = [
    { id: 1, title: "Home", image: iconsImgs.home },
    { id: 2, title: "Tickets", image: iconsImgs.budget },
    { id: 3, title: "Fines", image: iconsImgs.bills },
    { id: 4, title: "Notifications", image: iconsImgs.bell },
    { id: 5, title: "Reports", image: iconsImgs.report },
    { id: 6, title: "Account", image: iconsImgs.user }
  ] :  navigationLinks = [
    { id: 1, title: "Home", image: iconsImgs.home },
    { id: 2, title: "Tickets", image: iconsImgs.budget },
    { id: 3, title: "Notifications", image: iconsImgs.bell },
    { id: 4, title: "Reports", image: iconsImgs.report },
    { id: 5, title: "Account", image: iconsImgs.user }
  ];

  const [activeLinkIdx, setActiveLinkIdx] = useState(0);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const { user, logout, isAuthenticated} = useAuth0();
  const [isReady, setIsReady] = useState(false);

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
          <img src={user.picture} alt="Profile Picture" />
        </div>
        <span className="info-name">{userData.name}</span>
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
                  {navigationLink.title === "Notifications" && notificationsCount > 0 && (
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
