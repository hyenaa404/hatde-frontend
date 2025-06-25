import { useState, useEffect } from "react";
import AccessoryCard from "./accessories/AccessoryCard";
import "./styles/services.css"
import { getAccessoryServices } from "../data/data"
import SearchBar from "./accessories/SearchBar";
import Pagination from "../../components/common/Pagination";

function AccessoryServices() {

  const [accessoryService, setAccessoryServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const weddingServices = await getAccessoryServices();
      setAccessoryServices(weddingServices);
    };

    fetchData();
  }, []);

  // Lọc danh sách theo tên phụ kiện
  const filteredAccessories = accessoryService.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredAccessories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAccessories.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <div className="header-section">
        <h2>Hô biến ngày cưới mơ ước thành hiện thực chỉ với vài cú click!</h2><br />
        <p>
          Mọi dịch vụ bạn cần cho ngày cưới đều ở đây — book lẹ tay, yêu thêm say!</p>
        {/* <SearchBar /> */}
      </div>
      <div className="stores-content">
        <main className="main-content">
          <div className="header-bar">
            <p>Phụ kiện phổ biến</p>
          </div>
          {/* Thanh tìm kiếm ngay trên danh sách phụ kiện */}
          <div className="mb-3 d-flex justify-content-end align-items-center" style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm tên phụ kiện..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{ maxWidth: 350, paddingLeft: 12, paddingRight: 32 }}
            />
            <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none', fontSize: 18 }}>
              <i className="bi bi-search"></i>
            </span>
          </div>
          <div className="store-grid">
            {currentItems.map(item => (
              <AccessoryCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </>
  );
}

export default AccessoryServices;