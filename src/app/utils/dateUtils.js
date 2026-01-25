import { months } from "./constants";
import moment from 'moment'

export function getDaysByMonths(month) {
  switch (month.toLowerCase()) {
    case months.jan.toLowerCase():
    case months.mar.toLowerCase():
    case months.may.toLowerCase():
    case months.jul.toLowerCase():
    case months.aug.toLowerCase():
    case months.oct.toLowerCase():
    case months.dec.toLowerCase():
      return 31;
    case months.apr.toLowerCase():
    case months.jun.toLowerCase():
    case months.sep.toLowerCase():
    case months.nov.toLowerCase():
      return 30;
    case months.feb.toLowerCase():
      return 28;
  }
}

export function getBirthdayFromDOB(dob) {
  return moment(dob).format('MMMM DD'); // e.g., "May 22"
}