import FileChooser from "@/app/components/fileChooser/fileChooser";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function HomeWorkList({ hwData, saveHomeWork }) {
  const [homeWorkList, setHomeWorkList] = useState([]);

  useEffect(() => {
    setHomeWorkList(hwData);
  }, [hwData]);

  async function onFileSelected(event, item) {
    const file = event.target.files[0];
    console.log("####subjectList", file);

    const formData = new FormData();
    formData.append("file", file);
    const attachmentData = {
      attachment: formData,
      id: new Date().getTime(),
      name: file.name,
      type: file.type,
    };

    const list = homeWorkList?.map((listItem) => {
      if (listItem.id === item.id) {
        console.log("if");
        const newItem = { ...listItem };
        if (newItem.attachments) {
          newItem.attachments.push(attachmentData);
        } else {
          newItem.attachments = [attachmentData];
        }
        return newItem;
      } else {
        console.log("else");

        return listItem;
      }
    });

    setHomeWorkList(list);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("###Base64", e.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function onHWChanged(event, item) {
    const text = event.target.value;
    const list = homeWorkList?.map((listItem) => {
      if (listItem.id === item.id) {
        const newItem = { ...listItem, textHW: text };
        return newItem;
      } else {
        return listItem;
      }
    });
    setHomeWorkList(list);
  }

  async function onSaveHWClicked() {
    saveHomeWork(homeWorkList);
  }

  return (
    <>
      <div className={styles.description}>
        {homeWorkList?.map((item, index) => {
          return (
            <div key={index} className={styles.listItem}>
              <div className={styles.subjectRow}>
                <label className={styles.subjectTitle}>{item?.name}</label>
                <textarea
                  className={styles.hwInput}
                  value={item.textHW}
                  disabled={true}
                  onInput={(event) => onHWChanged(event, item)}
                ></textarea>
              </div>
              {false && (
                <FileChooser
                  onClick={(event) => onFileSelected(event, item)}
                ></FileChooser>
              )}

              {item?.attachments?.map((attachment) => {
                return (
                  <div>
                    <label>{attachment.name}</label>
                    {false && (
                      <button
                        onClick={() => onAttachmentClicked(item, attachment)}
                      >
                        delete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div>
          <button onClick={onSaveHWClicked}>
            <label>Save Home Work</label>
          </button>
        </div>
      </div>
    </>
  );
}
