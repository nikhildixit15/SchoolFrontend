import Table from "react-bootstrap/Table";

function ExamTable({ listData }) {
  console.log("students", listData);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Exam Date</th>
          <th>Class</th>
          <th>Section</th>
          <th>Subject</th>
          <th>Test</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {listData?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.examDate}</td>
            <td>{item.class}</td>
            <td>{item.section}</td>
            <td>{item.subject}</td>
            <td>{item.examType}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExamTable;
