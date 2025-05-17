import Sidebar from "../components/services/SideBar";
import ServiceCard from "../components/services/ServiceCard";
import "../styles/stores.css"
import { services } from "./example-data"
import CategoryFilter from "../components/services/CategoryFilter";
import Pagination from "../components/common/Pagination";
import { useState } from "react";

function Services() {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = services.slice(startIndex, startIndex + itemsPerPage);
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
              <ServiceCard key={service.id} service={service} />
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

export default Services;