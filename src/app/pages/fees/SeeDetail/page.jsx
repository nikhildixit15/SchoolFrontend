"use client"

import React, { useState, useEffect } from 'react';
import { Home, Users, DollarSign, BarChart3, Settings, LogOut, Search, Printer, Receipt, User, Clock } from 'lucide-react';
import { getStudents } from '@/app/services/student/studentService';
 
// --- MOCK DATA ---

const FEE_STRUCTURE = [
  { type: 'Tuition Fee - Q1', amount: 2500.00, dueDate: '15 Apr, 2024', status: 'Paid' },
  { type: 'Tuition Fee - Q2', amount: 2500.00, dueDate: '15 Jul, 2024', status: 'Overdue' },
  { type: 'Lab Fees', amount: 500.00, dueDate: '15 Apr, 2024', status: 'Paid' },
  { type: 'Sports Fees', amount: 250.00, dueDate: '15 Apr, 2024', status: 'Pending' },
];

const PAYMENT_HISTORY = [
  { transactionId: 'TXN1002984', date: '10 Apr, 2024', amount: 5500.00, method: 'Credit Card' },
  { transactionId: 'TXN1002511', date: '10 Jan, 2024', amount: 5000.00, method: 'Bank Transfer' },
];

// --- UTILITY COMPONENTS ---

const StatusBadge = ({ status }) => {
  let className = 'badge default';
  if (status === 'Paid') className = 'badge paid';
  else if (status === 'Overdue') className = 'badge overdue';
  else if (status === 'Pending') className = 'badge pending';

  return (
    <span className={className}>
      {status}
    </span>
  );
};

const SummaryCard = ({ title, value, colorClass, time }) => (
  <div className="summary-card">
    <p className="summary-title">{title}</p>
    <div className={`summary-value ${colorClass}`}>
      {value}
    </div>
    {time && (
      <div className="summary-time">
        <Clock className="icon-sm icon-gray mr-2" />
        {time}
      </div>
    )}
  </div>
);

// --- MAIN SECTIONS ---
 
const StudentList = ({ students, selectedStudent, setSelectedStudent }) => (
  <div className="student-list-container">
    <div className="student-list-header">
      <h2 className="section-title">Students</h2>
    </div>
    <div className="student-list-scroll">
      {students.map((student) => (
        <div
          key={student.id}
          className={`student-list-item ${selectedStudent.id === student.id ? 'selected' : ''}`}
          onClick={() => setSelectedStudent(student)}
        >
          <img
  className="student-avatar"
  src={
    student.gender === "Male"
      ? `https://placehold.co/40x40/4F46E5/white?text=${student.firstName[0]}`
      : `https://placehold.co/40x40/4F46E5/white?text=${student.firstName[0]}`
  }
  alt={student.name}
/>

          <div>
            <p className="student-name">{student.name}</p>
            <p className="student-details">
              ID: {student._id} | Class: {student.className}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FeeTable = ({ title, data }) => (
  <div className="data-card">
    <h3 className="card-title">{title}</h3>
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th className="table-header">FEE TYPE</th>
            <th className="table-header">AMOUNT</th>
            <th className="table-header">DUE DATE</th>
            <th className="table-header">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="table-cell-main">{item.type}</td>
              <td className="table-cell">${item.amount.toFixed(2)}</td>
              <td className="table-cell">{item.dueDate}</td>
              <td className="table-cell">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PaymentHistoryTable = ({ data }) => (
  <div className="data-card payment-history-card">
    <h3 className="card-title">Payment History</h3>
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th className="table-header">TRANSACTION ID</th>
            <th className="table-header">DATE</th>
            <th className="table-header">AMOUNT PAID</th>
            <th className="table-header">PAYMENT METHOD</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="table-cell-main">{item.transactionId}</td>
              <td className="table-cell">{item.date}</td>
              <td className="table-cell-paid">${item.amount.toFixed(2)}</td>
              <td className="table-cell">{item.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FeeDetails = ({ student }) => {
  const outstandingFormatted = `$${student.adarNo}`;
  const paidFormatted = `$${student.userName}`;

  return (
    <div className="fee-details-content">
      {/* Page Title & Student Info */}
      <div className="page-header">
        <h1 className="page-title">Student Fee Details</h1>
        <p className="page-subtitle">
          View and manage fee information for <span className="student-name-highlight">{student.name}</span>.
        </p>
      </div>

      {/* Actions */}
      <div className="action-buttons-container">
        <button className="button secondary">
          <Printer className="icon-xs mr-2" />
          Print Statement
        </button>
        <button className="button primary">
          <Receipt className="icon-xs mr-2" />
          Record Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards-grid">
        <SummaryCard
          title="Total Outstanding"
          value={outstandingFormatted}
          colorClass="text-red"
        />
        <SummaryCard
          title="Total Paid (This Year)"
          value={paidFormatted}
          colorClass="text-green"
        />
        <SummaryCard
          title="Next Payment Due"
          value="15 Aug, 2024"
          colorClass="text-default"
          time={true}
        />
      </div>

      {/* Current Year Fee Structure */}
      <FeeTable
        title="Current Year Fee Structure"
        data={FEE_STRUCTURE}
      />

      {/* Payment History */}
      <PaymentHistoryTable
        data={PAYMENT_HISTORY}
      />
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---

export default function App() {
  const [activeItem, setActiveItem] = useState('Fees Management');
  const [selectedStudent, setSelectedStudent] = useState({adarNo:0, userName:0});
  const [searchTerm, setSearchTerm] = useState('');
  const [student,setStudents] = useState([]);

 useEffect(() => {
    getStudentData();
  }, []);

   async function getStudentData() {
    const result = await getStudents({});
    setStudents(result?.data || []); 
    console.log("Fetched students:", result);
  }

  const filteredStudents = student.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student._id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="app-container">
      
      <style>
        {`
          /* === BASE STYLES === */
          .app-container {
            display: flex;
            height: 100vh;
            background-color: #F9FAFB; /* gray-50 */
            font-family: 'Inter', sans-serif;
            overflow: hidden;
          }

          /* === ICONS === */
          .mr-2 { margin-right: 0.5rem; }
          .mr-3 { margin-right: 0.75rem; }
          .icon-sm { width: 1.25rem; height: 1.25rem; } /* w-5 h-5 */
          .icon-xs { width: 1rem; height: 1rem; } /* w-4 h-4 */
          .icon-gray { color: #6B7280; }

          /* === SIDEBAR === */
          .sidebar {
            width: 256px; /* w-64 */
            background-color: white;
            border-right: 1px solid #E5E7EB; /* border-gray-200 */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            padding: 1.5rem; /* p-6 */
            box-sizing: border-box;
          }

          .logo-container {
            display: flex;
            align-items: center;
            margin-bottom: 2.5rem; /* mb-10 */
          }

          .logo-icon {
            width: 2rem; /* w-8 */
            height: 2rem; /* h-8 */
            background-color: #4F46E5; /* indigo-600 */
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.5rem;
          }

          .logo-inner {
            width: 1rem;
            height: 1rem;
            border: 2px solid white;
            border-radius: 0.25rem;
          }

          .logo-text {
            font-size: 1.25rem; /* text-xl */
            font-weight: 700; /* font-bold */
            color: #111827; /* gray-900 */
          }           

          .user-section {
            padding-top: 1.5rem;
            border-top: 1px solid #E5E7EB;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .user-info-row {
            display: flex;
            align-items: center;
            padding: 0.5rem;
          }

          .user-avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            margin-right: 0.75rem;
            border: 2px solid #F3F4F6;
          }

          .admin-name {
            font-size: 0.875rem;
            font-weight: 600;
            color: #111827;
          }

          .admin-role {
            font-size: 0.75rem;
            color: #6B7280;
          }

          /* === MAIN CONTENT AREA === */
          .main-content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          /* Header/Search */
          .main-header {
            width: 100%;
            background-color: white;
            padding: 1rem;
            border-bottom: 1px solid #E5E7EB;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            display: flex;
            align-items: center;
            justify-content: flex-end; /* Mobile default */
            z-index: 10;
          }

          .search-container {
            position:relative;
            width: 100%;
            min-width: 500px;
          }

          .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            width: 1.25rem;
            height: 1.25rem;
            color: #9CA3AF; /* gray-400 */
          }

          .search-input {
            width: 100%;
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            border: 1px solid #D1D5DB; /* gray-300 */
            border-radius: 0.75rem; /* rounded-xl */
            outline: none;
            font-size: 0.875rem;
            transition: box-shadow 150ms ease, border-color 150ms ease;
          }

          .search-input:focus {
            border-color: #4F46E5; /* indigo-500 */
            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
          }

          .user-profile-icon {
            width: 1.5rem;
            height: 1.5rem;
            color: #6B7280;
            margin-left: 1rem;
            display: none;
          }

          /* Content Layout */
          .content-layout {
            flex-grow: 1;
            display: flex;
            overflow: hidden;
            padding: 1rem;
          }

          /* Student List */
          .student-list-column {
            width: 100%; /* Mobile default */
            max-width: 384px; /* max-w-sm */
            margin-right: 1.5rem;
            height: 100%;
            display: none; /* Hidden on mobile */
          }

          .student-list-container {
            width: 100%;
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            height: 100%;
            border: 1px solid #E5E7EB;
            overflow: hidden;
          }

          .student-list-header {
            padding: 1rem;
            border-bottom: 1px solid #E5E7EB;
          }

          .section-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #111827;
          }

          .student-list-scroll {
            overflow-y: auto;
            flex-grow: 1;
          }

          .student-list-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #F3F4F6;
            cursor: pointer;
            transition: background-color 150ms ease;
          }

          .student-list-item:hover {
            background-color: #F9FAFB; /* hover:bg-gray-50 */
          }

          .student-list-item.selected {
            background-color: #EEF2FF; /* indigo-50 */
            border-left: 4px solid #4F46E5; /* border-l-4 border-indigo-500 */
          }

          .student-list-item.selected:hover {
            background-color: #EEF2FF; /* Maintain hover color when selected */
          }

          .student-avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            margin-right: 0.75rem;
          }

          .student-name {
            font-size: 0.875rem;
            font-weight: 600;
            color: #111827;
          }

          .student-details {
            font-size: 0.75rem;
            color: #6B7280;
          }

          /* Fee Details Content */
          .fee-details-wrapper {
            flex-grow: 1;
            overflow-y: auto;
            height: 100%;
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          .fee-details-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .page-header {
            border-bottom: 1px solid #E5E7EB;
            padding-bottom: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.25rem;
          }

          .page-subtitle {
            font-size: 0.875rem;
            color: #6B7280;
          }

          .student-name-highlight {
            font-weight: 500;
            color: #374151;
          }

          /* Buttons */
          .action-buttons-container {
            display: flex;
            gap: 1rem;
          }

          .button {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .button.primary {
            background-color: #4F46E5; /* indigo-600 */
            color: white;
            border: 1px solid #4F46E5;
          }

          .button.primary:hover {
            background-color: #4338CA; /* indigo-700 */
          }

          .button.secondary {
            background-color: white;
            color: #4F46E5;
            border: 1px solid #A5B4FC; /* indigo-300 */
          }

          .button.secondary:hover {
            background-color: #EEF2FF; /* indigo-50 */
          }

          /* Summary Cards */
          .summary-cards-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .summary-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #F3F4F6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }

          .summary-title {
            font-size: 0.875rem;
            font-weight: 500;
            color: #6B7280;
            margin-bottom: 0.5rem;
          }

          .summary-value {
            font-size: 2.25rem; /* text-4xl */
            font-weight: 800; /* font-extrabold */
            margin-bottom: 0.75rem;
          }

          .summary-time {
            display: flex;
            align-items: center;
            color: #374151;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .text-red { color: #DC2626; } /* red-600 */
          .text-green { color: #10B981; } /* green-600 */
          .text-default { color: #111827; } /* gray-900 */

          /* Tables */
          .data-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #F3F4F6;
          }

          .payment-history-card {
            margin-top: 1.5rem;
          }

          .card-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 1rem;
          }

          .table-wrapper {
            overflow-x: auto;
          }

          .data-table {
            min-width: 100%;
            border-collapse: collapse;
            font-size: 0.875rem;
          }

          .data-table thead {
            border-bottom: 1px solid #E5E7EB;
          }

          .table-header {
            padding: 0.75rem 1rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 500;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .data-table tbody {
            background-color: white;
            border-top: 1px solid #F3F4F6;
          }

          .data-table tr {
            border-bottom: 1px solid #F3F4F6;
          }

          .table-cell, .table-cell-main, .table-cell-paid {
            padding: 1rem 1rem;
            white-space: nowrap;
            color: #374151;
          }

          .table-cell-main {
            font-weight: 500;
            color: #111827;
          }

          .table-cell-paid {
            font-weight: 500;
            color: #059669; /* green-700 */
          }

          /* Status Badges */
          .badge {
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 500;
            border-radius: 9999px;
            display: inline-block;
          }

          .badge.default { background-color: #F3F4F6; color: #374151; }
          .badge.paid { background-color: #D1FAE5; color: #065F46; } /* green-100/700 */
          .badge.overdue { background-color: #FEE2E2; color: #991B1B; } /* red-100/700 */
          .badge.pending { background-color: #FEF3C7; color: #92400E; } /* yellow-100/700 */

          /* === MEDIA QUERIES (Responsiveness) === */

          /* Tablet/Desktop (sm: 640px) */
          @media (min-width: 640px) {
            .main-header {
              justify-content: space-between;
            }
            .user-profile-icon {
              display: block;
            }
            .content-layout {
              padding: 1.5rem;
            }
            .student-list-column {
              display: block; /* Show student list on tablet/desktop */
              width: 33.333%; /* lg:w-1/3 */
            }
            .search-container {
              max-width: 250px;
            }
          }

          /* Medium Desktop (lg: 1024px) */
          @media (min-width: 1024px) {
            .student-list-column {
              width: 25%; /* xl:w-1/4 */
            }
          }

          /* Large Desktop (Summary Grid) */
          @media (min-width: 768px) {
            .summary-cards-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}
      </style>
 
      {/* 2. Main Content Area */}
      <div className="main-content">
        
        {/* Header/Search Bar */}
        <div className="main-header">
          <div className="logo-text" style={{display: 'none'}}>
            {/* Displaying active item title on larger screens where search is narrow */}
            {activeItem}
          </div>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by Name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          {/* Mock user icon for the top right */}
          <User className="user-profile-icon" />
        </div>

        {/* Content Layout: Student List + Fee Details */}
        <div className="content-layout">
          
          {/* Left Column: Students List */}
          <div className="student-list-column">
            <StudentList
              students={filteredStudents}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>

          {/* Right Column: Fee Details */}
          <div className="fee-details-wrapper">
            <FeeDetails student={selectedStudent} />
          </div>
        </div>
      </div>
    </div>
  );
}
