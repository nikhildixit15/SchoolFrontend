import styles from "./paymentStatus.module.css";

export default function StudentPaymentStatus({ data}) {
  if (!data?.success) {
    return <div className={styles.error}>No payment data available</div>;
  }

  const {
    firstName ,
    lastName,
    payment = 0,
    dueAmount,
    advanceAmount = 0,
    dueDate,
    paymentStatus,
  } = data;

  const statusClass =
    paymentStatus === "Paid"
      ? styles.paid
      : paymentStatus === "Partially Paid"
      ? styles.partial
      : styles.unpaid;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Payment Details</h2>
        <span className={`${styles.badge} ${statusClass}`}>
          {paymentStatus}
        </span>
      </div>

      <div className={styles.grid}>
        <div>
          <label>Student Name</label>
          <p>{firstName} {lastName}</p>
        </div>

        <div>
          <label>Payment Done</label>
          <p>₹{payment}</p>
        </div>

        <div>
          <label>Due Amount</label>
          <p className={styles.due}>₹{dueAmount}</p>
        </div>

        <div>
          <label>Advance Amount</label>
          <p className={styles.advance}>₹{advanceAmount}</p>
        </div>

        <div className={styles.fullRow}>
          <label>Due Date</label>
          <p>{new Date(dueDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
