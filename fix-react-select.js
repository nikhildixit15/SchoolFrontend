#!/usr/bin/env node

/**
 * Fix React Select hydration issues by:
 * 1. Adding "use client" directive to files that need it
 * 2. Adding instanceId props to Select components
 */

const fs = require('fs');
const path = require('path');

// Files that use React Select (from the Agent analysis)
const reactSelectFiles = [
  'src/app/pages/academic/activities/addEvent.jsx',
  'src/app/pages/academic/activities/monthwiseEvents.jsx', 
  'src/app/pages/academic/holidays/addHoliday.jsx',
  'src/app/pages/academic/dateSheet/AddNewExamView.jsx',
  'src/app/pages/timeTable/teacherWise/page.jsx',
  'src/app/pages/timeTable/classWise/page.jsx',
  'src/app/pages/timeTable/dayWise/page.jsx',
  'src/app/pages/staff/createStaff/page.jsx',
  'src/app/pages/staff/staffList/staffFilter.jsx',
  'src/app/pages/staff/departmentMaster/addDesignation.jsx',
  'src/app/pages/admin/addClass/addSection.jsx',
  'src/app/pages/admin/assignedPeriods/page.jsx',
  'src/app/pages/message/defaulters/messageBuilderView.jsx',
  'src/app/pages/message/defaulters/defaulterFilter.jsx',
  'src/app/pages/message/messageToStaff/messageBuilderView.jsx',
  'src/app/pages/message/messageToStaff/StaffFilter.jsx',
  'src/app/pages/message/smartMessage/messageBuilderView.jsx',
  'src/app/pages/message/messageTemplate/addTemplateMessage.jsx',
  'src/app/pages/message/commonMessage/messageBuilderView.jsx',
  'src/app/pages/attendance/stu/studentAttendance/attendanceTable.jsx',
  'src/app/pages/attendance/stu/studentAttendance/attendanceFilter.jsx',
  'src/app/pages/attendance/stu/attendanceClasswise/attendanceFilter.jsx',
  'src/app/pages/attendance/stu/attendanceDatewise/datewiseFilter.jsx',
  'src/app/pages/attendance/stu/attendanceRegister/attendanceFilter.jsx',
  'src/app/pages/attendance/stu/attendanceRegister/attendanceRegisterTable.jsx'
];

// Files already fixed
const alreadyFixed = [
  'src/app/pages/student/createStudent/page.js', // Fixed manually
  'src/app/components/multiSelect/multiSelect.jsx', // Fixed manually
  'src/app/components/messageTemplateSelector/messageTemplateSelector.jsx', // Fixed manually
  'src/app/components/monthClassFilter/monthClassFilter.jsx', // Fixed manually  
  'src/app/components/classFilter/classSecFilter.jsx' // Fixed manually
];

function addUseClientDirective(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if "use client" already exists
    if (content.includes('"use client"') || content.includes("'use client'")) {
      console.log(`✓ ${filePath} already has "use client" directive`);
      return false;
    }
    
    // Add "use client" at the beginning
    const newContent = '"use client";\n\n' + content;
    fs.writeFileSync(filePath, newContent);
    console.log(`✓ Added "use client" to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function generateInstanceId(filePath, index) {
  const fileName = path.basename(filePath, path.extname(filePath));
  return `${fileName}-select-${index + 1}`;
}

function addInstanceIdToSelects(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let selectIndex = 0;
    
    // Find all <Select> components and add instanceId if missing
    const selectRegex = /<Select([^>]*?)>/g;
    
    content = content.replace(selectRegex, (match, props) => {
      // Check if instanceId already exists
      if (props.includes('instanceId')) {
        return match;
      }
      
      selectIndex++;
      const instanceId = generateInstanceId(filePath, selectIndex - 1);
      
      // Add instanceId prop
      const newMatch = `<Select${props}
            instanceId="${instanceId}"
          >`;
      
      modified = true;
      return newMatch;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Added instanceId props to ${selectIndex} Select components in ${filePath}`);
    } else {
      console.log(`- No Select components need instanceId in ${filePath}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`✗ Error adding instanceId to ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing React Select hydration issues...\n');
  
  let fixedFiles = 0;
  let totalFiles = 0;
  
  // Process all React Select files
  for (const filePath of reactSelectFiles) {
    totalFiles++;
    console.log(`\n📁 Processing: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }
    
    let fileModified = false;
    
    // Add "use client" directive
    if (addUseClientDirective(filePath)) {
      fileModified = true;
    }
    
    // Add instanceId to Select components  
    if (addInstanceIdToSelects(filePath)) {
      fileModified = true;
    }
    
    if (fileModified) {
      fixedFiles++;
    }
  }
  
  console.log(`\n✅ Completed! Fixed ${fixedFiles}/${totalFiles} files.`);
  console.log('\nManually fixed files:');
  alreadyFixed.forEach(file => console.log(`  ✓ ${file}`));
}

if (require.main === module) {
  main();
}
