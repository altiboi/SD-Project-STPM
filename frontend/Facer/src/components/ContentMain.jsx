import "./ContentMain.css";
import Cards from "./Cards/Cards";
import Transactions from "./Transactions/Transactions";
import Report from "./Report/Report";
import Budget from "./Budget/Budget";
import Budget2 from "./Budget/Budget2";
import Subscriptions from "./Subscriptions/Subscriptions";
import Savings from "./Savings/Savings";
import Loans from "./Loans/Loans";
import Financial from "./Financial/Financial";
import Table from "../Table";

const ContentMain = () => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <Budget />
        <Budget2></Budget2>
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
