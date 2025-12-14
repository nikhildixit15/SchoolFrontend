"use client"

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const FeeManagementDashboard = () => { 

  // Sample data for monthly fee collection
  const monthlyData = [
    { month: 'Jan', amount: 95000 },
    { month: 'Feb', amount: 120000 },
    { month: 'Mar', amount: 110000 },
    { month: 'Apr', amount: 98000 },
    { month: 'May', amount: 115000 },
    { month: 'Jun', amount: 130000 },
    { month: 'Jul', amount: 105000 },
    { month: 'Aug', amount: 125000 }
  ];

  // Sample data for payment methods
  const paymentMethodData = [
    { name: 'Credit Card', value: 450000, percentage: 36 },
    { name: 'Bank Transfer', value: 400000, percentage: 32 },
    { name: 'Cash', value: 250000, percentage: 20 },
    { name: 'Online Payment', value: 150000, percentage: 12 }
  ];

  // Sample data for class-wise fees
  const classWiseData = [
    { class: 'Class 1', totalFee: 150000, collected: 140000, pending: 10000, students: 30 },
    { class: 'Class 2', totalFee: 150000, collected: 145000, pending: 5000, students: 30 },
    { class: 'Class 3', totalFee: 160000, collected: 155000, pending: 5000, students: 32 },
    { class: 'Class 4', totalFee: 160000, collected: 148000, pending: 12000, students: 32 },
     
  ];

  // Recent activities data
  const recentActivities = [
    { student: 'Sophia Clark', feeType: 'Tuition Fee', amount: 5000, status: 'Paid', date: '2023-08-15' },
    { student: 'Ethan Miller', feeType: 'Library Fee', amount: 100, status: 'Paid', date: '2023-08-16' }
    
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <>
      
      <div className="dashboard-container">

        {/* Main Content */}
        <div className="main-content">
          <div className="page-header">
            <h1 className="page-title">All fee Detail Here</h1>
            <p className="page-subtitle">Overview of fee management activities</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Fees Collected</p>
              <h2 className="stat-value">$1,250,000</h2>
              <p className="stat-change positive">+10%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Outstanding Fees</p>
              <h2 className="stat-value">$150,000</h2>
              <p className="stat-change negative">-5%</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Refunds Processed</p>
              <h2 className="stat-value">$12,500</h2>
              <p className="stat-change positive">+2%</p>
            </div>
          </div>

          {/* Class-wise Fee Breakdown */}
          <div className="section">
            <h3 className="section-title">Class-wise Fee Collection</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th className="text-right">Students</th>
                    <th className="text-right">Total Fee</th>
                    <th className="text-right">Collected</th>
                    <th className="text-right">Pending</th>
                    <th className="text-right">Collection %</th>
                  </tr>
                </thead>
                <tbody>
                  {classWiseData.map((item, index) => {
                    const collectionPercent = ((item.collected / item.totalFee) * 100).toFixed(1);
                    return (
                      <tr key={index}>
                        <td className="font-medium">{item.class}</td>
                        <td className="text-right">{item.students}</td>
                        <td className="text-right">${item.totalFee.toLocaleString()}</td>
                        <td className="text-right text-green">
                          ${item.collected.toLocaleString()}
                        </td>
                        <td className="text-right text-red">
                          ${item.pending.toLocaleString()}
                        </td>
                        <td className="text-right">
                          <span className={`collection-badge ${
                            parseFloat(collectionPercent) >= 95 ? 'high' :
                            parseFloat(collectionPercent) >= 90 ? 'medium' : 'low'
                          }`}>
                            {collectionPercent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">{classWiseData.reduce((sum, item) => sum + item.students, 0)}</td>
                    <td className="text-right">${classWiseData.reduce((sum, item) => sum + item.totalFee, 0).toLocaleString()}</td>
                    <td className="text-right text-green">${classWiseData.reduce((sum, item) => sum + item.collected, 0).toLocaleString()}</td>
                    <td className="text-right text-red">${classWiseData.reduce((sum, item) => sum + item.pending, 0).toLocaleString()}</td>
                    <td className="text-right">
                      {((classWiseData.reduce((sum, item) => sum + item.collected, 0) / classWiseData.reduce((sum, item) => sum + item.totalFee, 0)) * 100).toFixed(1)}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 className="section-subtitle">Collection vs Pending by Class</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classWiseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collected" fill="#10B981" name="Collected" />
                  <Bar dataKey="pending" fill="#EF4444" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Analytics */}
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Payment Analytics</h2>
          <div className="charts-grid">
            {/* Monthly Fee Collection */}
            <div className="chart-card">
              <div className="chart-header">
                <p className="chart-label">Monthly Fee Collection</p>
                <h3 className="chart-value">$125,000</h3>
                <p className="chart-change">This Month +5%</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} fill="#DBEAFE" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Fee Payment Methods */}
            <div className="chart-card">
              <p className="chart-label">Fee Payment Methods</p>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="section">
            <h3 className="section-title">Recent Activities</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>STUDENT NAME</th>
                    <th>FEE TYPE</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.student}</td>
                      <td>{activity.feeType}</td>
                      <td>${activity.amount.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${activity.status === 'Paid' ? 'success' : 'warning'}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td style={{ color: '#6b7280' }}>{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        .sidebar {
          width: 256px;
          background-color: #ffffff;
          border-right: 1px solid #e5e7eb;
          padding: 16px;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          padding: 0 16px;
        }

        .sidebar-logo {
          width: 40px;
          height: 40px;
          background-color: #fb923c;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: bold;
          color: #111827;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .help-menu {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
        }

        .main-content {
          flex: 1;
          margin-left: 256px;
          padding: 32px;
          overflow-x: hidden;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 30px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 4px;
        }

        .page-subtitle {
          color: #6b7280;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .stat-label {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 30px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 4px;
        }

        .stat-change {
          font-size: 14px;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-change.negative {
          color: #ef4444;
        }

        .section {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 24px;
        }

        .section-subtitle {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead tr {
          border-bottom: 1px solid #e5e7eb;
        }

        .data-table th {
          text-align: left;
          padding: 12px 16px;
          font-weight: 600;
          color: #374151;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .data-table th.text-right {
          text-align: right;
        }

        .data-table tbody tr {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.15s ease;
        }

        .data-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .data-table td {
          padding: 16px;
          color: #111827;
        }

        .data-table td.text-right {
          text-align: right;
        }

        .data-table td.font-medium {
          font-weight: 500;
        }

        .data-table td.text-green {
          color: #10b981;
          font-weight: 500;
        }

        .data-table td.text-red {
          color: #ef4444;
          font-weight: 500;
        }

        .data-table tfoot {
          background-color: #f9fafb;
          font-weight: bold;
        }

        .data-table tfoot td {
          padding: 12px 16px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge.success {
          background-color: #d1fae5;
          color: #065f46;
        }

        .badge.warning {
          background-color: #fef3c7;
          color: #92400e;
        }

        .badge.danger {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .collection-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .collection-badge.high {
          background-color: #d1fae5;
          color: #065f46;
        }

        .collection-badge.medium {
          background-color: #fef3c7;
          color: #92400e;
        }

        .collection-badge.low {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .chart-card {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .chart-header {
          margin-bottom: 16px;
        }

        .chart-label {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .chart-value {
          font-size: 30px;
          font-weight: bold;
          color: #111827;
        }

        .chart-change {
          color: #10b981;
          font-size: 14px;
        }

        @media (max-width: 1280px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 0;
            padding: 0;
            overflow: hidden;
          }

          .main-content {
            margin-left: 0;
            padding: 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 24px;
          }

          .stat-value {
            font-size: 24px;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

    </>
  );
};

export default FeeManagementDashboard;