"use client";
import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import styles from "./teacherDashboard.module.css";
import { getProfileData } from "@/app/services/dashboard/dashboardService";
import { teacherWiseTimeTable, homeWorkList, eventList, studentAttendanceList, profileData } from "@/mocks";

export default function TeacherDashboard() {
  const [profileData, setProfileData] = useState({});
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    pendingHomework: 0,
    todayAttendance: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const profile = await getProfileData();
      setProfileData(profile);
      
      // Get today's schedule
      const today = new Date().toLocaleLowerCase();
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const todayName = days[new Date().getDay()];
      
      const todayClasses = teacherWiseTimeTable.filter(item => 
        item.dayName.toLowerCase() === todayName
      );
      setTodaySchedule(todayClasses);

      // Calculate stats
      const uniqueClasses = new Set();
      teacherWiseTimeTable.forEach(day => {
        Object.values(day.periods || {}).forEach(period => {
          if (period.className) {
            uniqueClasses.add(period.className);
          }
        });
      });

      setStats({
        totalStudents: studentAttendanceList.length,
        totalClasses: uniqueClasses.size,
        pendingHomework: homeWorkList.length,
        todayAttendance: Math.floor(Math.random() * 100) + 80
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  }

  const formatPeriodTime = (period) => {
    const times = {
      p1: "09:00-09:40",
      p2: "09:40-10:20", 
      p3: "10:20-11:00",
      p4: "11:20-12:00",
      p5: "12:00-12:40",
      p6: "12:40-01:20",
      p7: "01:20-02:00",
      p8: "02:00-02:40"
    };
    return times[period] || period;
  };

  return (
    <div className={styles.dashboard}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h2>Welcome back, {profileData.name || 'Teacher'}!</h2>
        <p className="text-muted">Here's what's happening in your school today</p>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className={styles.statsCard}>
            <Card.Body>
              <div className={styles.statsContent}>
                <div className={styles.statsIcon + " " + styles.studentsIcon}>
                  <i className="fas fa-users"></i>
                </div>
                <div className={styles.statsText}>
                  <h3>{stats.totalStudents}</h3>
                  <p>Total Students</p> 
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className={styles.statsCard}>
            <Card.Body>
              <div className={styles.statsContent}>
                <div className={styles.statsIcon + " " + styles.classesIcon}>
                  <i className="fas fa-chalkboard"></i>
                </div>
                <div className={styles.statsText}>
                  <h3>{stats.totalClasses}</h3>
                  <p>Classes Teaching</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className={styles.statsCard}>
            <Card.Body>
              <div className={styles.statsContent}>
                <div className={styles.statsIcon + " " + styles.homeworkIcon}>
                  <i className="fas fa-book"></i>
                </div>
                <div className={styles.statsText}>
                  <h3>{stats.pendingHomework}</h3>
                  <p>Pending Homework</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className={styles.statsCard}>
            <Card.Body>
              <div className={styles.statsContent}>
                <div className={styles.statsIcon + " " + styles.attendanceIcon}>
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className={styles.statsText}>
                  <h3>{stats.todayAttendance}%</h3>
                  <p>Today's Attendance</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Today's Schedule */}
        <Col lg={8} className="mb-4">
          <Card className={styles.scheduleCard}>
            <Card.Header>
              <h5>Today's Schedule</h5>
            </Card.Header>
            <Card.Body>
              {todaySchedule.length > 0 ? (
                <div className={styles.scheduleList}>
                  {todaySchedule.map((day, index) => (
                    <div key={index}>
                      {Object.entries(day.periods || {}).map(([period, details]) => (
                        <div key={period} className={styles.scheduleItem}>
                          <div className={styles.timeSlot}>
                            {formatPeriodTime(period)}
                          </div>
                          <div className={styles.classDetails}>
                            <h6>{details.subject}</h6>
                            <p>{details.className}</p>
                          </div>
                          <div className={styles.actions}>
                            <Link href="/pages/attendance/stu/studentAttendance" className="btn btn-sm btn-outline-primary">
                              Take Attendance
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noSchedule}>
                  <p>No classes scheduled for today</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col lg={4} className="mb-4">
          <Card className={styles.quickActionsCard}>
            <Card.Header>
              <h5>Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className={styles.actionsList}>
                <Link href="/pages/attendance/stu/studentAttendance" className={styles.actionItem}>
                  <i className="fas fa-clipboard-check"></i>
                  <span>Take Attendance</span>
                </Link>
                
                <Link href="/pages/homeWork/assignHomeWork" className={styles.actionItem}>
                  <i className="fas fa-tasks"></i>
                  <span>Assign Homework</span>
                </Link>
                
                <Link href="/pages/timeTable/teacherWise" className={styles.actionItem}>
                  <i className="fas fa-calendar-alt"></i>
                  <span>View Timetable</span>
                </Link>
                
                <Link href="/pages/message/commonMessage" className={styles.actionItem}>
                  <i className="fas fa-envelope"></i>
                  <span>Send Message</span>
                </Link>
                
                <Link href="/pages/student/studentList" className={styles.actionItem}>
                  <i className="fas fa-users"></i>
                  <span>View Students</span>
                </Link>
                
                <Link href="/pages/academic/activities" className={styles.actionItem}>
                  <i className="fas fa-calendar-plus"></i>
                  <span>Add Event</span>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Homework */}
        <Col lg={6} className="mb-4">
          <Card className={styles.recentCard}>
            <Card.Header>
              <h5>Recent Homework</h5>
              <Link href="/pages/homeWork/viewHomeWork" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              <div className={styles.recentList}>
                {homeWorkList.slice(0, 4).map((homework) => (
                  <div key={homework.id} className={styles.recentItem}>
                    <div className={styles.itemIcon}>
                      <i className="fas fa-book"></i>
                    </div>
                    <div className={styles.itemContent}>
                      <h6>{homework.name}</h6>
                      <p>{homework.departmentName}</p>
                      <small className="text-muted">
                        {homework.attachments.length} attachments
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col lg={6} className="mb-4">
          <Card className={styles.recentCard}>
            <Card.Header>
              <h5>Upcoming Events</h5>
              <Link href="/pages/academic/activities" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              <div className={styles.recentList}>
                {eventList.slice(0, 4).map((event) => (
                  <div key={event.id} className={styles.recentItem}>
                    <div className={styles.itemIcon}>
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className={styles.itemContent}>
                      <h6>{event.description}</h6>
                      <p>{event.eventDate}</p>
                      <small className="text-muted">
                        {event.classes.length} classes involved
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
