import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import Table from "react-bootstrap/Table";

export default function HolidayList({ listData }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Classes</th>
            <th>Event Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData?.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{item.classes.join(",  ")}</td>
              <td>{item.eventDate}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
