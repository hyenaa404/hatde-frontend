import Sidebar from "./wedding/SideBar";
import WeddingCard from "./wedding/WeddingCard";
import "./styles/services.css";
import { getWeddingServices, getWeddingServicesByCategoryIdAsync } from "../data/data";
import CategoryFilter from "./wedding/CategoryFilter";
import Pagination from "../../components/common/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function WeddingServices() {
  const { id } = useParams();

  const [allProvinces, setAllProvinces] = useState([]);
  const [visibleProvinces, setVisibleProvinces] = useState([]);
  const [provinceFilter, setProvinceFilter] = useState([]);
  const [searchServiceTerm, setSearchServiceTerm] = useState("");

  const [weddingServices, setWeddingServices] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch wedding services + provinces
  useEffect(() => {
    const fetchData = async () => {
      const services = id
        ? await getWeddingServicesByCategoryIdAsync(id)
        : await getWeddingServices();
      setWeddingServices(services);
    };

    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((prov) => ({
          ...prov,
          name: prov.name.replace(/^Tỉnh |^Thành phố /, "").trim(),
        }));

        setAllProvinces(normalized);
        setVisibleProvinces(normalized.slice(0, 10));
      });

    fetchData();
  }, [id]);

  // Handle Load More for Provinces
  const handleLoadMoreProvinces = () => {
    const currentLength = visibleProvinces.length;
    const next = allProvinces.slice(currentLength, currentLength + 10);
    setVisibleProvinces((prev) => [...prev, ...next]);
  };

  // Handle search for provinces
  const handleSearchProvince = (e) => {
    const term = e.target.value.toLowerCase();
    // setSearchTerm(term); // Không dùng searchTerm này nữa

    const filtered = allProvinces.filter((prov) =>
      prov.name.toLowerCase().includes(term)
    );

    setVisibleProvinces(filtered.slice(0, 10));
  };

  // Lọc theo giá
  const filterByPriceRange = (services, selectedRanges) => {
    if (selectedRanges.length === 0) return services;

    return services.filter((service) => {
      const price = service.price;

      return selectedRanges.some((range) => {
        if (range === "Dưới 3tr") return price < 3000000;
        if (range === "3tr - 5tr") return price >= 3000000 && price <= 5000000;
        if (range === "5tr - 7tr") return price > 5000000 && price <= 7000000;
        if (range === "7tr - 10tr") return price > 7000000 && price <= 10000000;
        if (range === "Trên 10tr") return price > 10000000;
        return true;
      });
    });
  };
  const filterByCategory = (services, selectedCategoryIds) => {
    if (selectedCategoryIds.length === 0) return services;

    return services.filter(service =>
      selectedCategoryIds.includes(service.serviceCategoryId)
    );
  };

  // Lọc theo tỉnh thành
  const filterByProvince = (services, selectedProvinces) => {
    if (selectedProvinces.length === 0) return services;

    return services.filter((service) => {
      if (!service.address) return false;

      const addressProvinces = service.address
        .split(",")
        .map((p) => p.trim());

      return selectedProvinces.some((province) =>
        addressProvinces.includes(province)
      );
    });
  };

  // Lọc theo từ khóa nhập liệu cục bộ
  const filteredServices = filterByProvince(
    filterByPriceRange(
      filterByCategory(weddingServices, selectedCategories),
      selectedPriceRanges
    ),
    provinceFilter
  ).filter(service =>
    service.title.toLowerCase().includes(searchServiceTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="header-section">
        <h2>Dịch vụ cưới chuyên nghiệp</h2>
        <p>
          Hô biến ngày cưới mơ ước thành hiện thực chỉ với vài cú click!
          Mô tả phụ: Mọi dịch vụ bạn cần cho ngày cưới đều ở đây — book lẹ tay, yêu thêm say!
        </p>
      </div>

      <CategoryFilter />

      <div className="stores-content">
        <Sidebar
          selectedPriceRanges={selectedPriceRanges}
          setSelectedPriceRanges={setSelectedPriceRanges}
          visibleProvinces={visibleProvinces}
          provinceFilter={provinceFilter}
          setProvinceFilter={setProvinceFilter}
          handleSearchProvince={handleSearchProvince}
          handleLoadMoreProvinces={handleLoadMoreProvinces}
          searchTerm={searchServiceTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <main className="main-content">
          {/* Thanh tìm kiếm ngay trên danh sách dịch vụ */}
          <div className="mb-3 d-flex justify-content-end align-items-center" style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm tên dịch vụ..."
              value={searchServiceTerm}
              onChange={e => {
                setSearchServiceTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{ maxWidth: 350, paddingLeft: 12, paddingRight: 32 }}
            />
            <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none', fontSize: 18 }}>
              <i className="bi bi-search"></i>
            </span>
          </div>

          <div className="store-grid">
            {currentItems.map((service) => (
              <WeddingCard key={service.serviceId} service={service} />
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