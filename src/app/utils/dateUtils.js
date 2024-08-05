import { months } from "./constants";

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
    case months.Apr.toLowerCase():
    case months.jul.toLowerCase():
    case months.sep.toLowerCase():
    case months.nov.toLowerCase():
      return 30;
    case months.feb.toLowerCase():
      return 28;
  }
}
