import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";

const pxToMm = (px) => {
   return Math.floor(px / document.getElementById("myMm").offsetHeight);
};

const PrintButton = ({ label, printableClassName, disabled }) => (
   <div className="tc mb4 mt2">
      <div id="myMm" style={{ height: "1mm" }} />

      <Button
         type="primary"
         icon={<ExportOutlined />}
         size="large"
         disabled={disabled}
         onClick={() => {
            const printablePages = document.getElementsByClassName(printableClassName);
            const inputHeightMm = pxToMm(printablePages[0].offsetHeight);
            const a4WidthMm = 210;
            const a4HeightMm = 297;

            Promise.all(Array.from(printablePages).map((element) => html2canvas(element, { scale: 1.1 }))).then(
               (canvases) => {
                  let pdf;
                  //Document of a4WidthMm wide and inputHeightMm high
                  if (inputHeightMm > a4HeightMm) {
                     // elongated a4 (system print dialog will handle page breaks)
                     pdf = new jsPDF("p", "mm", [inputHeightMm + 16, a4WidthMm]);
                  } else {
                     // standard a4
                     pdf = new jsPDF();
                  }
                  let i = 0;
                  for (const canvas of canvases) {
                     const imgData = canvas.toDataURL("image/png");
                     pdf.addImage(imgData, "PNG", 7, 5);
                     if (i < printablePages.length - 1) {
                        pdf.addPage();
                     }
                     ++i;
                  }
                  pdf.save(`${printableClassName}.pdf`);
               }
            );
         }}
      >
         {label}
      </Button>
   </div>
);

export default PrintButton;
