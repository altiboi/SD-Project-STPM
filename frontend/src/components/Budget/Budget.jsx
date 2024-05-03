import "./Budget.css";
import { iconsImgs } from "../../utils/images";
//import { budget } from "../../data/data";

const Budget = ({ budgetItems }) => {
  
  
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Tickets</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Unsolved Tickets</h2>
        <span className="lg-value">{budgetItems.length}</span>
      </div>
      <div className="grid-c4-content bg-jet">
        <div className="grid-items">
          {budgetItems.map((budget, index) => (
            <div className="grid-item" key={index}>
              <div className="grid-item-l">
                <div className="icon">
                  <img src={iconsImgs.check} />
                </div>
                <p className="text text-silver-v1">
                  {budget.ticket_subject} <span>{budget.status}</span>
                </p>
              </div>
              <div className="grid-item-r">
              {budget.dateOpened ? (
        <span className="text-silver-v1">{budget.dateOpened}</span>
      ) : (
        <span className="text-silver-v1">Date not available</span>
      )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
