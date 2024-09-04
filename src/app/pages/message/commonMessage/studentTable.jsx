import Link from "next/link";
import Table from "react-bootstrap/Table";
import {useState,useEffect} from 'react'

function StudentTable({ students, sendMessage }) {

  const [studentList, setStudentList] = useState();
  const [isAllSelected, setAllSelected] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);


  useEffect(()=>{
    setStudentList(students);
  },[students])

  function onCheckboxSelected(selectedItem){
    selectedItem.isSelected=!selectedItem.isSelected;

   if(selectedItem.isSelected){
    selectedStudents.push(selectedItem)
    setSelectedStudents(selectedStudents)
    setAllSelected(selectedStudents.length == studentList.length)
   }else{
    const list = selectedStudents.filter((item)=>item.id !=  selectedItem.id)
    setSelectedStudents(list)
    setAllSelected(false)
   }

   const newList = studentList.map((item)=>item)
   setStudentList(newList);

   console.log("###selectedStudents", selectedStudents.length == studentList.length)

  }

  function onHeaderCheckboxSelected(){
    const list = studentList.map((item)=>{
      item.isSelected = !isAllSelected;
      return item;
    })

    if(!isAllSelected)
    {
      setSelectedStudents(list)
    }else{
      setSelectedStudents([])
    }
    setAllSelected(!isAllSelected)
    setStudentList(list)
   }

   function performSendMessage(){
   sendMessage(selectedStudents)
  }

  return (
    <div>
      {selectedStudents.count >0 &&
          <button onClick={performSendMessage}>Send Message</button>
      }

      <Table striped bordered hover>
      <thead>
        <tr>
          <th><input type="checkbox" checked={isAllSelected} onInput={onHeaderCheckboxSelected}></input></th>
          <th>#</th>
          <th>Student Name</th>
          <th>Father's Name</th>
          <th>Class</th>
          <th>Address</th>
          <th>User Name</th>
          <th>Mobile Number</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {studentList?.map((item, index) => (
          <tr>
           <td> <input type="checkbox" checked={item.isSelected}  onInput={()=>onCheckboxSelected(item)}   ></input></td>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.fatherName}</td>
            <td>{item.class}</td>
            <td>{item.address}</td>
            <td>{item.userName}</td>
            <td>{item.mobileNumber}</td>
            <td>
              <Link
                href={{
                  pathname: "/pages/student/studentDetails",
                  query: { student: JSON.stringify(item) },
                }}
              >
                view
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

  );
}

export default StudentTable;
