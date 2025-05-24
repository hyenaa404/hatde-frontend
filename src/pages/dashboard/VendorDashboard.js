import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const primaryColor = "#f43f5e";

export default function VendorDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    topService: "",
    chartData: [],
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fakeData = {
      revenue: 12500000,
      orders: 128,
      topService: "Gói cưới Premium",
      chartData: [
        { month: "Jan", revenue: 1000000 },
        { month: "Feb", revenue: 1200000 },
        { month: "Mar", revenue: 1500000 },
        { month: "Apr", revenue: 1700000 },
        { month: "May", revenue: 2000000 },
        { month: "Jun", revenue: 1800000 },
        { month: "Jul", revenue: 2200000 },
      ],
    };

    const fakeOrders = [
      { id: "ORD001", customer: "Khánh An", service: "Gói Premium", total: 2500000, status: "Hoàn tất" },
      { id: "ORD002", customer: "Minh Trí", service: "Trang trí cưới", total: 1800000, status: "Đang xử lý" },
      { id: "ORD003", customer: "Ngọc Hân", service: "Gói tiết kiệm", total: 1200000, status: "Hoàn tất" },
    ];

    setTimeout(() => {
      setStats(fakeData);
      setRecentOrders(fakeOrders);
    }, 500);
  }, []);

  return (

    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-start py-4">
  <div style={{ transform: "scale(0.85)", transformOrigin: "top center", width: "100%" }}>
    <div className="container py-3 px-2  bg-light min-vh-100">
      {/* <h1 className="mb-4 fw-bold" style={{ color: primaryColor }}>
        🎯 Vendor Dashboard
      </h1> */}

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center border-0 h-100">
            <div className="card-body">
              <div className="fs-1">💰</div>
              <p className="text-muted mb-1">Doanh thu</p>
              <h5 className="fw-bold text-dark">{stats.revenue.toLocaleString()} VND</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center border-0 h-100">
            <div className="card-body">
              <div className="fs-1">🛒</div>
              <p className="text-muted mb-1">Số đơn hàng</p>
              <h5 className="fw-bold text-dark">{stats.orders}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center border-0 h-100">
            <div className="card-body">
              <div className="fs-1">🏆</div>
              <p className="text-muted mb-1">Dịch vụ nổi bật</p>
              <h5 className="fw-bold text-dark">{stats.topService}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <p className="text-muted mb-2">📊 Doanh thu theo tháng</p>
          <div style={{ width: "90%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={stats.chartData}>
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="revenue" fill={primaryColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <p className="text-muted mb-3">📄 Đơn hàng gần đây</p>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Dịch vụ</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.service}</td>
                    <td>{order.total.toLocaleString()} VND</td>
                    <td>
                      <span
                        className={`badge bg-${order.status === "Hoàn tất" ? "success" : "warning"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      Không có đơn hàng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    
  );
}
