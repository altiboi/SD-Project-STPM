import "./Content.css";

import ContentTop from "./ContentTop";
import ContentMain from "./ContentMain";

const Content = ({ budgetItems, notifications, fines }) => {
  return (
    <div className="main-content">
      <ContentTop />
      <ContentMain budgetItems={budgetItems} notifications={notifications} fines={fines}/>
    </div>
  );
};

export default Content;
