import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./paymentHistoryTable.module.css";
import { downloadFeeReceipt } from "@/app/services/fees/feeServices";
function PaymentHistoryTable({ paymentList }) {
  console.log("students", paymentList);

  async function downloadReceipt(item) {
    await downloadFeeReceipt({ paymentId: "123", userName: "userName" });
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Collected By</th>
          <th>Payment Mode</th>
          <th>Payment Date</th>
          <th>Due Amount</th>
          <th>Paid Amount</th>
          <th>Remarks</th>
          <th>Receipt</th>
        </tr>
      </thead>

      <tbody>
        {paymentList?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.collectedBy}</td>
            <td>{item.paymentMode}</td>
            <td>{item.paymentDate}</td>
            <td>{item.dueAmount}</td>
            <td>{item.paidAmount}</td>
            <td>{item.remarks}</td>
            <td>
              <button
                className={styles.actionBtn}
                onClick={() => downloadReceipt(item)}
              >
                {" Download "}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PaymentHistoryTable;
