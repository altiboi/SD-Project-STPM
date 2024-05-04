import "./Content.css";

import ContentTop from "./ContentTop";
import ContentMain from "./ContentMain";

const Content = ({ budgetItems }) => {
  return (
    <div className="main-content">
      <ContentTop />
      <ContentMain budgetItems={budgetItems} />
    </div>
  );
};

export default Content;
