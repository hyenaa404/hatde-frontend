import { priceRanges } from './filterdata';
import { categories } from '../../landing/components/example-landing-data';

export const Sidebar = ({
  selectedPriceRanges, setSelectedPriceRanges,
  visibleProvinces, provinceFilter, setProvinceFilter,
  handleSearchProvince, handleLoadMoreProvinces, searchTerm,
  selectedCategories, setSelectedCategories
}) => {

  const handlePriceCheckboxChange = (value) => {
    if (selectedPriceRanges.includes(value)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(item => item !== value));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, value]);
    }
  };

  const handleProvinceCheckboxChange = (provinceName) => {
    if (provinceFilter.includes(provinceName)) {
      setProvinceFilter(provinceFilter.filter(p => p !== provinceName));
    } else {
      setProvinceFilter([...provinceFilter, provinceName]);
    }
  };

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setProvinceFilter([]);
  };

  return (
    <aside className="sidebar">
      {/* === Filter Giá === */}
      <div className="filter-section">
        <h3>Phạm vi giá</h3>
        <ul>
          {priceRanges.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(item)}
                onChange={() => handlePriceCheckboxChange(item)}
              />{" "}
              {item}
            </li>
          ))}
        </ul>
      </div>
      {/* === Filter Danh mục === */}
      <div className="filter-section">
        <h3>Loại dịch vụ</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => {
                  if (selectedCategories.includes(cat.id)) {
                    setSelectedCategories(selectedCategories.filter(id => id !== cat.id));
                  } else {
                    setSelectedCategories([...selectedCategories, cat.id]);
                  }
                }}
              />{" "}
              {cat.title}
            </li>
          ))}
        </ul>
      </div>

      {/* === Filter Tỉnh thành === */}
      <div className="filter-section">
        <h3>Khu vực</h3>
        <input
          type="text"
          placeholder="Tìm tỉnh thành..."
          value={searchTerm}
          onChange={handleSearchProvince}
          className="province-search-input"
        />
        <ul className="province-list">
          {visibleProvinces.map((prov) => (
            <li key={prov.code}>
              <input
                type="checkbox"
                checked={provinceFilter.includes(prov.name)}
                onChange={() => handleProvinceCheckboxChange(prov.name)}
              />{" "}
              {prov.name}
            </li>
          ))}
        </ul>
        {visibleProvinces.length < 63 && (
          <button className="load-more-btn border-0 bg-transparent" onClick={handleLoadMoreProvinces}>
            Tải thêm tỉnh
          </button>
        )}
      </div>

      {/* === Nút xoá lọc === */}
      <button className="clear-btn" onClick={clearAllFilters}>
        Xoá tất cả bộ lọc
      </button>
    </aside>
  );
};

export default Sidebar;
