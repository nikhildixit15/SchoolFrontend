import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { FileText, CheckCircle, ShieldAlert, AlertCircle, ArrowRight } from 'lucide-react';

const AdmissionsPage = () => {
  return (
    <div className={styles.admissionsPage}>
      {/* Hero & Breadcrumbs */}
      <header className={styles.hero}>
        <nav className={styles.breadcrumb}>
          <Link href="/" style={{color: 'white', textDecoration: 'none'}}>Home</Link> 
          &nbsp; / &nbsp; 
          <span>Admission Process</span>
        </nav>
        <h1>Admission Process</h1>
      </header>

      <main className={styles.container}>
        <div className={styles.contentCard}>
          <h2 className={styles.sectionHeader}>Guidelines for Enrollment</h2>
          
          <div className={styles.processList}>
            {/* Step 1 */}
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepText}>
                <h3>Application Submission</h3>
                <p>Application for admission should be made through the official Admission form available at the school office. Please ensure all details are filled accurately.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepText}>
                <h3>Documentation</h3>
                <p>No admission will be considered until all the required documents are submitted. This includes previous academic records, birth certificates, and identification proof.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepText}>
                <h3>Guardian Undertaking</h3>
                <p>Parents/Guardians must give a formal undertaking, stating that they will abide by the rules and regulations of the school as made and amended from time to time.</p>
              </div>
            </div>
          </div>

          {/* Important Policy Note */}
          <div className={styles.noticeBox}>
            <h4><AlertCircle size={20} /> Admission Policy</h4>
            <p>
              Please note that the School Management reserves the right to admission. 
              The School does not bind itself to furnish any reason for rejecting any application.
            </p>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Have more questions about the process?</p>
            <Link href="/pages/footerPages/contractUs" className={styles.linked} style={{ 
             
            }}>
              Contact Admission Office <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdmissionsPage;