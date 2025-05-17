
import { categories, priceRanges, colors } from './filterdata';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h3>Categories</h3>
        <ul>
          {categories.map((item, index) => (
            <li key={index}>
              <input type="checkbox" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <ul>
          {priceRanges.map((item, index) => (
            <li key={index}>
              <input type="checkbox" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Colors</h3>
        <ul className="colors">
          {colors.map((color, index) => (
            <li key={index}>{color}</li>
          ))}
        </ul>
        <button className="clear-btn">Clear All Filters</button>
      </div>
    </aside>
  );
}

export default Sidebar;
