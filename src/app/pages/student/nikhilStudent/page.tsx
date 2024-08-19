

import React from "react";
import Table from "react-bootstrap/Table";

const studentData=
[
  {
    Class :"I",
     A:5,
     B:5
  },
  {
    Class :"II",
     A:50,
     B:52
  },
  {
    Class :"III",
     A:10,
     B:6
  },
  {
    Class :"IV",
     A:15,
     B:25
  },
  
];

 function ClassData(){
  return(
    <>
    <Table>
    <thead>
          <tr>
            <th>S. No.</th>
            <th>Class </th>
            <th>A</th>
            <th>B</th>
            <th>Total</th>
          </tr>
    </thead>

    <tbody>
          {studentData?.map((item,index)=>(
             <tr>
             <th>{index+1}</th>
             <th>{item.Class} </th>
             <th>{item.A}</th>
             <th>{item.B}</th>
             <th>{item.A + item.B}</th>
           </tr>
          ))}
    </tbody>
    </Table>
    </>
  )
 }
 export default ClassData;