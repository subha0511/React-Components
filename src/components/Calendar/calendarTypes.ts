import * as dayjs from "dayjs";

export type DayObj = {
  date: dayjs.Dayjs;
  active: true | false;
  isSelected: true | false;
};

export type State = {
  currentMonthStartDate: dayjs.Dayjs;
  currentMonth: String;
  currentYear: String;
  selected: dayjs.Dayjs;
  weeks: Array<Array<DayObj>>;
};

export type Action =
  | {
      type: ActionTypes.setSelected;
      payload: dayjs.Dayjs;
    }
  | {
      type: ActionTypes.nextMonth | ActionTypes.prevMonth;
    };

export enum ActionTypes {
  setSelected = "SET_SELECTED",
  nextMonth = "NEXT_MONTH",
  prevMonth = "PREV_MONTH",
}
