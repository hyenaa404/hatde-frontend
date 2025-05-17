import Sidebar from "../components/stores/SideBar";
import StoreCard from "../components/stores/StoreCard";
import "../styles/stores.css"
import {stores} from "./example-data"
import Pagination from "../components/common/Pagination";
import { useState } from "react";

function Stores() {
  const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(stores.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = stores.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
    <div className="header-section">
        <h2>Cửa hàng tiệc cưới</h2>
      <p>Tìm mọi thứ bạn cần cho ngày đặc biệt của bạn</p>
    </div>
    <div className="stores-content">
      <Sidebar/>
      <main className="main-content">
        <div className="header-bar">
          <div>View: <i className="bi bi-grid-fill"></i> <i className="bi bi-list"></i></div>
          <div>Sort by: <select><option>Featured</option></select></div>
        </div>
        <div className="store-grid">
          {currentItems.map(store => (
            <StoreCard key={store.id} store={store} />
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

export default Stores;