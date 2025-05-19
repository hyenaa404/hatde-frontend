import Sidebar from "./wedding/SideBar";
import WeddingCard from "./wedding/WeddingCard";
import "./styles/services.css"
import { getWeddingServices } from "../data/data"
import CategoryFilter from "./wedding/CategoryFilter";
import Pagination from "../../components/common/Pagination";
import  { useState, useEffect } from "react";

function WeddingServices() {
  
  const [weddingServices, setWeddingServices] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
      const weddingServices = await getWeddingServices();
      setWeddingServices(weddingServices); 
  };

  fetchData();
}, []);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(weddingServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = weddingServices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="header-section">
        <h2>Dịch vụ cưới chuyên nghiệp</h2>
        <p>Tìm và đặt lịch với các chuyên gia tổ chức đám cưới hoàn hảo để biến đám cưới trong mơ của bạn thành hiện thực</p>
      </div>
      <CategoryFilter />
      <div className="stores-content">
        <Sidebar />
        <main className="main-content">
          <div className="header-bar">
            <div>View: <i className="bi bi-grid-fill"></i> <i className="bi bi-list"></i></div>
            <div>Sort by: <select><option>Featured</option></select></div>
          </div>
          <div className="store-grid">
            {currentItems.map(service => (
              <WeddingCard key={service.id} service={service} />
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

export default WeddingServices;