"use client";
// import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "./globals.css";
import MMSNavbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMasterData } from "./redux/slices/classSlice";
import { getMasterData } from "./services/common/commonService";

const inter = Inter({ subsets: ["latin"] });

export default function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    loadMasterData();
  },[]);

  async function loadMasterData() {
     const response= await getMasterData();
    const { classList, examTypeList, subjectList, staffList, periodList } = response.data;

    dispatch(
      setMasterData({
        examTypeList,
        subjectList,
        classes: classList,
        teacherList: staffList,
       periodList
      })
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <MMSNavbar></MMSNavbar>
        </header>
        {children}
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
