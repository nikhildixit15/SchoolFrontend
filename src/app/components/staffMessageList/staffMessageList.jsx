import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./staffMessageList.module.css";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
 
export default function StaffMessageList({ staff }) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (staff?.adminInfo?.userName) {
      getStaffMessages({ userName: staff.adminInfo.userName });
    }
    // eslint-disable-next-line
  }, [staff]);

  async function getStaffMessages({ userName }) {
    //const result = await getStaffMessagesById({ userName });
    setMessageList( []);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Staff Message List</div>
      {messageList?.map((item, index) => (
        <Accordion className={styles.accordion} defaultActiveKey="0" key={index}>
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
              <div>
                <div className={styles.messageType}>{item.messageType}</div>
                <div className={styles.senderRow}>
                  <label className={styles.senderText}>Sender</label>
                  <label className={styles.senderValue}>{item.sender}</label>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>{item.message}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}