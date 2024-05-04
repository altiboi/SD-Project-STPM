import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
//import { navigationLinks } from "../data/data";
import { SidebarContext } from "./sidebarContext";
import profilePic from "../assets/Lusanda.jpg";
import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";
import { useAuth0 } from "@auth0/auth0-react";

const navigationLinks = [
  { id: 1, title: "Home", image: iconsImgs.home },
  { id: 2, title: "Tickets", image: iconsImgs.budget },
  { id: 6, title: "Reports", image: iconsImgs.report },

  { id: 9, title: "Account", image: iconsImgs.user },
  { id: 10, title: "Settings", image: iconsImgs.gears },
];

const Sidebar = ({ dashboardActiveLinkIdx, setDashboardActiveLinkIdx }) => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const { user, logout, isAuthenticated} = useAuth0();
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState({
    role: null,
    phoneNumber: null,
    propName: null,
    name: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await fetch(`https://blocbuddyapi.azurewebsites.net/api/getUser?`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email : user.email})
              });
          if (response.ok) {
            const data = await response.json();
            setUserData({
              role: data.Role,
              phoneNumber: data.Phone,
              propName: data.PropertyName,
              name: data.Name
            });
          } else {
            console.error('Failed to fetch user:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsReady(true); // Set component readiness
      }
    };
  
    if (isAuthenticated && user.email) {
      fetchUser();
    }
  }, [isAuthenticated, user]);

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
