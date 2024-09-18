import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./studentFeeTable.module.css";
function StudentFeeTable({ dataList }) {
  console.log("students", students);

  const dateList = [new Date()];
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sunday</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
      </thead>

      <tbody>
        {[1, 2, 3, 4, 5]?.map((item, index) => (
          <tr>
            {[1, 2, 3, 4, 5, 6, 7]?.map((newItem, newIndex) => {
              if (index == 0 || index == 4) {
                return <td>{index + 1}</td>;
              } else {
                return <td>{index + 1}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StudentFeeTable;
