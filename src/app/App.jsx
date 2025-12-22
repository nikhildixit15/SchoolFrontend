"use client";
// import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import MMSNavbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMasterData } from "./redux/slices/classSlice";
import { getMasterData } from "./services/common/commonService";
import { usePathname } from "next/navigation"; 
import { Toaster } from "react-hot-toast";

export default function App({ children }) {
  const dispatch = useDispatch();

  const pathname = usePathname(); 
  const hideNavbarRoutes = ["/","/pages/forgotPassword","/pages/login"]; // is route par navbar hide
  const showNavbar = !hideNavbarRoutes.includes(pathname);

  useEffect(() => {
    loadMasterData(); 
  }, []);

  async function loadMasterData() {
    const response = await getMasterData();
    const {
      classList,
      examTypeList,
      subjectList,
      staffList,
      periodList,
      streamList,
    } = response.data;

    dispatch(
      setMasterData({
        examTypeList,
        subjectList,
        classes: classList,
        teacherList: staffList,
        periodList,
        streamList,
      })
    );
  }

  return (
    <html lang="en">
      <body >
        <Toaster/>
        {showNavbar && (
          <header>
            <MMSNavbar />
          </header>
        )}
        {children}
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
