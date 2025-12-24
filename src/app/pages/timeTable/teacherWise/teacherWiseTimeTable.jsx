import style from "./page.module.css";

export default function TeacherWiseTimeTable({ tableData }) {
  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <p>No schedule found</p>;
  }

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // ===== Group data by day =====
  const groupedByDay = dayOrder.reduce((acc, day) => {
    acc[day] = tableData
      .filter((item) => item.day === day)
      .sort(
        (a, b) => (a.periodNumber || 0) - (b.periodNumber || 0)
      );
    return acc;
  }, {});

  return (
    <div className={style.dayWrapper}>
      {dayOrder.map(
        (day) =>
          groupedByDay[day].length > 0 && (
            <div key={day} className={style.dayCard}>
              <h3 className={style.dayTitle}>{day}</h3>

              <table className={style.table}>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Period</th>
                    <th>Subject</th>
                  </tr>
                </thead>

                <tbody>
                  {groupedByDay[day].map((item, idx) => (
                    <tr key={`${day}-${item.periodNumber}-${idx}`}>
                      <td>{item.className}</td>
                      <td>{item.section}</td>
                      <td>Period {item.periodNumber}</td>
                      <td>{item.subjectName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}
    </div>
  );
}
