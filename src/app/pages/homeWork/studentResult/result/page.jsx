"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";
import styles from "./page.module.css";
import { getResults } from "@/app/services/homeWork/homeWorkServices";
import { downloadPDF } from "@/app/components/downloadpdf";

export default function ResultPage(studentId, examId) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (!studentId || !examId) {
          toast.error("Invalid request");
          return;
        }

        const res = await getResults(studentId, examId);
        if (!res?.data.result) {
          toast.error("Result not found");
          return;
        }

        setResult(res.data.result);
      } catch (error) {
        toast.error(error.message || "Failed to load result");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [studentId, examId]);

  if (loading) return <p className={styles.loading}>Loading result...</p>;
  if (!result) return <p className={styles.notFound}>No Result Found</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.page} ref={pdfRef}>
        <h2 className={styles.heading}>{result.examType}</h2>

        {/* ✅ Student Info */}
        <div className={styles.infoCard}>
          <p>
            <strong>Name:</strong> {result.studentName}
          </p>
          <p>
            <strong>StudentID:</strong> {result.studentUserName}
          </p>

          <p>
            <strong>Class:</strong> {result.className} ({result.sectionName})
          </p>
        </div>
        {/* ✅ Summary */}
        <div className={styles.summary}>
          <p>
            <strong>Total Obtained</strong>
            <span>{result.totalObtained}</span>
          </p>

          <p>
            <strong>Total Maximum</strong>
            <span>{result.totalMaximum}</span>
          </p>

          <p>
            <strong>Percentage</strong>
            <span>{Number(result.percentage || 0).toFixed(2)}%</span>
          </p>
        </div>

        {/* ✅ Subject Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Marks Obtained</th>
              <th>Total Marks</th>
            </tr>
          </thead>

          <tbody>
            {result?.subjects?.map((sub, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sub.subjectName}</td>
                <td>{sub.marksObtained}</td>
                <td>{sub.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-html2canvas-ignore="true"
          className={styles.downloadBtn}
          onClick={() =>
            downloadPDF(pdfRef.current, `${result.studentName}_Result`)
          }
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
