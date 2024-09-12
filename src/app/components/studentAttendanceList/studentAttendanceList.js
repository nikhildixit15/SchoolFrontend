import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./studentAttendanceList.module.css";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { getStudentAttendanceById } from "@/app/services/attendance/attendance";
function StudentAttendanceList({ userName }) {
  const [messageList, setMessageList] = useState();
  useEffect(() => {
    getStudentAttendanceList({ userName });
  }, []);

  async function getStudentAttendanceList(data) {
    const result = await getStudentAttendanceById({
      userName: "userName",
    });

    setMessageList(result);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Student Attendance List</div>
      {messageList?.map((item, index) => {
        return (
          <Accordion className={styles.accordion} defaultActiveKey="0">
            <Accordion.Item eventKey={index}>
              <Accordion.Header>
                <div>
                  <div className={styles.messageType}>{item.messageType}</div>
                  <div className={styles.senderRow}>
                    <label className={styles.senderText}>{"Sender"}</label>
                    <label className={styles.senderValue}>{item.sender}</label>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>{item.message}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
}

export default StudentAttendanceList;
