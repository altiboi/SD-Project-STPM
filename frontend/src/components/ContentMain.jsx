import "./ContentMain.css";
import Budget from "./Budget/Budget";
import Budget2 from "./Budget/Budget2";
import Budget3 from "./Budget/Budget3";

const ContentMain = ({ budgetItems, notifications, fines }) => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <Budget budgetItems={budgetItems}/>
        {fines !== "no fines" && <Budget3 fines={fines}/>}
        <Budget2 notifications={notifications}/>
      </div>
      <div className="content-grid-two">
        <div className="grid-two-item">
          <div className="subgrid-two"></div>
        </div>

        <div className="grid-two-item">
          <div className="subgrid-two"></div>
        </div>
      </div>
    </div>
  );
};

export default ContentMain;
