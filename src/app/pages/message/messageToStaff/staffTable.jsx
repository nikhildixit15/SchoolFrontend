import Link from "next/link";
import Table from "react-bootstrap/Table";
import {useState,useEffect} from 'react'

function StaffTable({ staffData, sendMessage }) {

  const [staffList, setStaffList] = useState();
  const [isAllSelected, setAllSelected] = useState(false);
  const [selectedStaffList, setSelectedStaffList] = useState([]);


  useEffect(()=>{
    setStaffList(staffData);
  },[staffData])

  function onCheckboxSelected(selectedItem){
    selectedItem.isSelected=!selectedItem.isSelected;

   if(selectedItem.isSelected){
    selectedStaffList.push(selectedItem)
    setSelectedStaffList(selectedStaffList)
    setAllSelected(selectedStaffList.length === staffList.length)

   }else{
    const list = selectedStaffList.filter((item)=>item.id !=  selectedItem.id)
    setSelectedStaffList(list)
    setAllSelected(false)
   }

   const newList = staffList.map((item)=>item)
   setStaffList(newList);
   console.log("item.isSelected",selectedItem.isSelected);
  }

  function onHeaderCheckboxSelected(){
    const list = staffList.map((item)=>{
      item.isSelected = !isAllSelected;
      return item;
    })

    if(!isAllSelected)
    {
      setSelectedStaffList(list)
    }else{
      setSelectedStaffList([])
    }
    setAllSelected(!isAllSelected)
    setStaffList(list)
   }

   function performSendMessage(){
   sendMessage(selectedStaffList)
  }

  return (
    <div>
      {selectedStaffList.count >0 &&
          <button onClick={performSendMessage}>Send Message</button>
      }

      <Table striped bordered hover>
      <thead>
        <tr>
          <th><input type="checkbox" checked={isAllSelected}  onInput={onHeaderCheckboxSelected}></input></th>
          <th>#</th>
          <th>Name</th>
          <th>Father's Name</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Contact</th>
        </tr>
      </thead>

      <tbody>
        {staffList?.map((item, index) => (
          <tr>
           <td> <input type="checkbox" checked={item.isSelected}  onInput={()=>onCheckboxSelected(item)}   ></input></td>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.fatherName}</td>
            <td>{item.department}</td>
            <td>{item.designation}</td>
            <td>{item.mobileNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

  );
}

export default StaffTable;
