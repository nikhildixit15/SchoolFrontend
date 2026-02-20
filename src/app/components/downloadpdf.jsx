import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async (element, fileName = "result") => {
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
  pdf.save(`${fileName}.pdf`);
};
