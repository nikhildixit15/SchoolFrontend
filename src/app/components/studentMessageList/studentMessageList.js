import Link from "next/link";
import Table from "react-bootstrap/Table";
import styles from "./studentMessageList.module.css";
import { downloadFeeReceipt } from "@/app/services/fees/feeServices";
import { getStudentMessagesById } from "@/app/services/message/messageService";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
function StudentMessageList({ userName }) {
  const [messageList, setMessageList] = useState();
  useEffect(() => {
    getStudentMessages({ userName });
  }, []);

  async function getStudentMessages(data) {
    const result = await getStudentMessagesById({
      userName: "userName",
    });

    console.log("hjgksdjhgkjs", result);

    setMessageList(result);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Student message List</div>
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

export default StudentMessageList;
