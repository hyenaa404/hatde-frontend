
import { availabilityOptions, priceRanges, ratingOptions } from './filterdata';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      

      <div className="filter-section">
        <h3>Phạm vi giá</h3>
        <ul>
          {priceRanges.map((item, index) => (
            <li key={index}>
              <input type="checkbox" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Khả dụng</h3>
        <ul>
          {availabilityOptions.map((item, index) => (
            <li key={index}>
              <input type="checkbox" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Xếp hạng</h3>
        <ul>
          {ratingOptions.map((item, index) => (
            <li key={index}>
              <input type="checkbox" /> {item}
            </li>
          ))}
        </ul>
      </div>
      <button className="clear-btn">Clear All Filters</button>

      
    </aside>
  );
}

export default Sidebar;
