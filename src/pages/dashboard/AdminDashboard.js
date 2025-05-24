import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const primaryColor = "#0d6efd"; // Màu xanh Bootstrap

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    chartData: [],
  });

  useEffect(() => {
    const fakeData = {
      totalRevenue: 95200000,
      totalOrders: 430,
      totalUsers: 120,
      chartData: [
        { month: "Jan", revenue: 8000000 },
        { month: "Feb", revenue: 10500000 },
        { month: "Mar", revenue: 13000000 },
        { month: "Apr", revenue: 9000000 },
        { month: "May", revenue: 11500000 },
        { month: "Jun", revenue: 11000000 },
        { month: "Jul", revenue: 12200000 },
      ],
    };

    setTimeout(() => {
      setStats(fakeData);
    }, 500);
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-start py-4">
      <div style={{ transform: "scale(0.85)", transformOrigin: "top center", width: "100%" }}>
        <div className="container py-3 px-2 bg-light min-vh-100">
          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card shadow-sm text-center border-0 h-100">
                <div className="card-body">
                  <div className="fs-1">💰</div>
                  <p className="text-muted mb-1">Tổng doanh thu</p>
                  <h5 className="fw-bold text-dark">{stats.totalRevenue.toLocaleString()} VND</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center border-0 h-100">
                <div className="card-body">
                  <div className="fs-1">🧾</div>
                  <p className="text-muted mb-1">Tổng số đơn hàng</p>
                  <h5 className="fw-bold text-dark">{stats.totalOrders}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm text-center border-0 h-100">
                <div className="card-body">
                  <div className="fs-1">👤</div>
                  <p className="text-muted mb-1">Tổng người dùng</p>
                  <h5 className="fw-bold text-dark">{stats.totalUsers}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <p className="text-muted mb-2">📈 Doanh thu theo tháng</p>
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

        </div>
      </div>
    </div>
  );
}
