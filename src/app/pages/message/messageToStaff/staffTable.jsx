import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

function StaffTable({ staffData = [], sendMessage }) {
  const [staffList, setStaffList] = useState([]);
  const [isAllSelected, setAllSelected] = useState(false);
  const [selectedStaffList, setSelectedStaffList] = useState([]);

  useEffect(() => {
    setStaffList(staffData);
    setSelectedStaffList([]);
    setAllSelected(false);
  }, [staffData]);

  function onCheckboxSelected(id) {
    const updated = staffList.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );

    setStaffList(updated);

    const selected = updated.filter((item) => item.isSelected);
    setSelectedStaffList(selected);
    setAllSelected(selected.length === updated.length);
  }

  function onHeaderCheckboxSelected() {
    const selectAll = !isAllSelected;

    const updated = staffList.map((item) => ({
      ...item,
      isSelected: selectAll,
    }));

    setStaffList(updated);
    setSelectedStaffList(selectAll ? updated : []);
    setAllSelected(selectAll);
  }

  function performSendMessage() {
    const ids = selectedStaffList.map((item) => item.id);
    const emails = selectedStaffList.map((item) => item.email).filter(Boolean);
console.log("Hello", ids, emails)
    sendMessage({
      ids,
      emails,
    });
  }

  return (
    <div>
      {selectedStaffList.length > 0 && (
        <button onClick={performSendMessage}>Send Message</button>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onHeaderCheckboxSelected}
              />
            </th>
            <th>#</th>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Mobile</th>
          </tr>
        </thead>

        <tbody>
          {staffList.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.isSelected}
                  onChange={() => onCheckboxSelected(item.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.employeeId}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
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
