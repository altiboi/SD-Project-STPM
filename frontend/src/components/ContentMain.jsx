import "./ContentMain.css";
import Budget from "./Budget/Budget";

const ContentMain = ({ budgetItems }) => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <Budget budgetItems={budgetItems}/>
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
