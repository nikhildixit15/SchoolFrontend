import Table from "react-bootstrap/Table";

/* -------------------- UTILS -------------------- */

const getShortMonthName = (dateStr) =>
  new Date(dateStr).toLocaleString("en-US", { month: "short" });

const getDaysInMonth = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based
  return new Date(year, month + 1, 0).getDate();
};

const getDayFromDate = (dateStr) => {
  if (!dateStr) return null;
  return Number(dateStr.split("-")[2]);
};

const getStatusLabel = (status) => {
  switch (status) {
    case "Present":
      return "P";
    case "Absent":
      return "A";
    case "Half Day":
      return "HD";
    case "Early Leave":
      return "EL";
    case "Holiday":
      return "H";
    default:
      return "";
  }
};

/* -------------------- COMPONENT -------------------- */

function AttendanceRegisterTable({ students, month }) {
  const attendanceRecords = students?.data || [];

  const monthName = getShortMonthName(month); // Dec
  const totalDays = getDaysInMonth(month);    // 31
  const dateList = Array.from({ length: totalDays }, (_, i) => i + 1);

  console.log("Attendance Record:", attendanceRecords, monthName, totalDays);

  /* -------- Group attendance by student -------- */

  const groupedStudents = attendanceRecords.reduce((map, item) => {
    if (!map[item.studentId]) {
      map[item.studentId] = {
        studentId: item.studentId,
        name: item.name,
        className: item.className,
        section: item.section,
        fatherName: item.fatherName,
        days: {}, // { 1: "Present", 2: "Absent" }
      };
    }

    const day = getDayFromDate(item.attendanceDate);
    if (day) {
      map[item.studentId].days[day] = item.status;
    }

    return map;
  }, {});

  const studentList = Object.values(groupedStudents);

  /* -------------------- RENDER -------------------- */

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Class</th>
          <th>Section</th>
          <th>Father Name</th>

          {dateList.map((day) => (
            <th key={day}>{day}</th>
          ))}

          <th>TW</th>
          <th>TA</th>
        </tr>
      </thead>

      <tbody>
        {studentList.length === 0 ? (
          <tr>
            <td colSpan={dateList.length + 8} align="center">
              No attendance data found
            </td>
          </tr>
        ) : (
          studentList.map((student, index) => {
            const presentCount = Object.values(student.days).filter(
              (status) => status === "Present"
            ).length;

            return (
              <tr key={student.studentId}>
                <td>{index + 1}</td>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.section}</td>
                <td>{student.fatherName}</td>

                {dateList.map((day) => (
                  <td key={day} align="center">
                    {getStatusLabel(student.days[day])}
                  </td>
                ))}

                <td>{totalDays}</td>
                <td>{presentCount}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
}

export default AttendanceRegisterTable;  