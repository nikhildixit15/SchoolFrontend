import Table from "react-bootstrap/Table";

function AttendanceTable({ students}) {
  if (!Array.isArray(students) || students.length === 0) {
    return <p>No students found</p>;
  }

  // Flatten date-wise students
  const rows = students.flatMap((day) =>
    day.students.map((stu) => ({
      date: new Date(day.date).toLocaleDateString(),
      studentId: stu.studentId,
      studentName: stu.studentName,
      fatherName: stu.fatherName,
      mobileNumber: stu.mobileNumber,
      status: stu.status,
    }))
  );

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Father Name</th>
          <th>Mobile No</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={`${row.studentId}-${index}`}>
            <td>{index + 1}</td>
            <td>{row.date}</td>
            <td>{row.studentId}</td>
            <td>{row.studentName}</td>
            <td>{row.fatherName}</td>
            <td>{row.mobileNumber}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AttendanceTable;
