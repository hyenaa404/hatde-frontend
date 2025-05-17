import { useState } from "react";
import DecorCard from "../components/decors/DecorCard";
import "../styles/stores.css"
import { decorItems } from "./example-data"
import SearchBar from "../components/decors/SearchBar";
import Pagination from "../components/common/Pagination";

function Decors() {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(decorItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = decorItems.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <div className="header-section">
        <h2>Tất cả các phụ kiện ở đây</h2><br />
        <p>Tìm kiếm những sản phẩm cần thiết cho đám cưới của bạn</p>
        <SearchBar />
      </div>
      <div className="stores-content">
        <main className="main-content">
          <div className="header-bar">
            <p>Phụ kiện phổ biến</p>
          </div>
          <div className="store-grid">
            {currentItems.map(item => (
              <DecorCard key={item.id} item={item} />
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

export default Decors;