import "./Budget.css";
import { iconsImgs } from "../../utils/images";

const Budget2 = ({ notifications }) => {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const displayedItems = notifications.slice(0, 5);
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Notifications</h3>
        {/* <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button> */}
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Unseen Notifications</h2>
        <span className="lg-value">{notifications.length}</span>
      </div>
      <div className="grid-c4-content bg-jet">
        <div className="grid-items">
        {notifications.length === 0 ? (
            <div className="grid-item">
              <p className="text text-silver-v1">No new notifications</p>
            </div>
          ) : (displayedItems.map((notification, index) => (
            <div className="grid-item" key={index}>
              <div className="grid-item-l">
                <div className="icon">
                  <img src={iconsImgs.check} />
                </div>
                <p className="text text-silver-v1">
                  {notification.header}
                  <span>{truncateText(notification.body, 15)}</span>
                </p>
              </div>
              <div className="grid-item-r">
                <span className="text-silver-v1">{notification.sendDate}</span>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default Budget2;
