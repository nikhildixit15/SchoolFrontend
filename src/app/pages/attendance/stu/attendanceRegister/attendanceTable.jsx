import Table from "react-bootstrap/Table";

/* -------------------- UTILS -------------------- */

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
    case "National Holiday":
      return "NH";
    default:
      return "";
  }
};

const isSunday = (year, monthIndex, day) =>
  new Date(year, monthIndex, day).getDay() === 0;

const isHoliday = (year, monthIndex, day, holidays) => {
  const current = new Date(year, monthIndex, day);
  current.setHours(12, 0, 0, 0); // 🔒 timezone safe

  return holidays.some((h) => {
    const start = new Date(h.startDate);
    const end = new Date(h.endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return current >= start && current <= end;
  });
};

/* -------------------- TABLE -------------------- */

function AttendanceTable({
  studentList,
  dateList,
  year,
  monthIndex,
  totalDays,
  holidays = [],
}) {
  return (
    
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Student ID</th>
          <th>Name</th>
          <th>Class</th>
          <th>Section</th>
          <th>Father</th>
          {dateList.map((day) => (
            <th key={day}>{day}</th>
          ))}
          <th>TW</th>
          <th>TA</th>
        </tr>
      </thead>

      <tbody>
        {studentList.map((student, index) => {
          const presentCount = Object.values(student.days).filter(
            (s) => s === "Present"
          ).length;

          return (
            <tr key={student.studentId}>
              <td>{index + 1}</td>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.className}</td>
              <td>{student.section}</td>
              <td>{student.fatherName}</td>

              {dateList.map((day) => {
                const holiday = isHoliday(
                  year,
                  monthIndex,
                  day,
                  holidays
                );
                const sunday = isSunday(year, monthIndex, day);

                let status = null;

                if (student.days[day]) {
                  status = student.days[day];        // ✅ highest priority
                } else if (holiday) {
                  status = "National Holiday";                 // ✅ full range absent
                } else if (sunday) {
                  status = "Absent";
                }

                return (
                  <td
                    key={day}
                    align="center"
                    style={
                      holiday
                        ? { backgroundColor: "#3b914e" }
                        : sunday
                        ? { backgroundColor: "#e4646f" }
                        : {}
                    }
                  >
                    {getStatusLabel(status)}
                  </td>
                );
              })}

              <td>{totalDays}</td>
              <td>{presentCount}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default AttendanceTable;
