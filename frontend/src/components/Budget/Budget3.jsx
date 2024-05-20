import "./Budget.css";
import { iconsImgs } from "../../utils/images";
//import { budget } from "../../data/data";

const Budget3 = ({ fines }) => {
    const displayedItems = fines.slice(0, 5);
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Fines</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Issued Fines</h2>
        <span className="lg-value">{fines.length}</span>
      </div>
      <div className="grid-c4-content bg-jet">
        <div className="grid-items">
          {displayedItems.map((budget, index) => (
            <div className="grid-item" key={index}>
              <div className="grid-item-l">
                <div className="icon">
                  <img src={iconsImgs.check} />
                </div>
                <p className="text text-silver-v1">
                  {budget.fine_reason} <span>R{budget.fine_amount}</span>
                </p>
              </div>
              <div className="grid-item-r">
              {budget.date_issued ? (
        <span className="text-silver-v1">{budget.date_issued}</span>
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

export default Budget3;
