import { useReducer } from "react";
import * as dayjs from "dayjs";

const actionTypes = {
  setSelected: "SET_SELECTED",
  nextMonth: "NEXT_MONTH",
  prevMonth: "PREV_MONTH",
};

const calendarReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.setSelected: {
      return {
        ...state,
        currentMonthStartDate: action.payload.startOf("M"),
        currentMonth: action.payload.format("MMMM"),
        currentYear: action.payload.format("YYYY"),
        selected: action.payload,
        weeks: getDateList(action.payload.startOf("M"), action.payload),
      };
    }
    case actionTypes.nextMonth: {
      const next = state.currentMonthStartDate.add(1, "M");
      return {
        ...state,
        currentMonthStartDate: next.startOf("M"),
        currentMonth: next.format("MMMM"),
        currentYear: next.format("YYYY"),
        weeks: getDateList(next.startOf("M"), state.selected),
      };
    }
    case actionTypes.prevMonth: {
      const prev = state.currentMonthStartDate.subtract(1, "M");
      return {
        ...state,
        currentMonthStartDate: prev.startOf("M"),
        currentMonth: prev.format("MMMM"),
        currentYear: prev.format("YYYY"),
        weeks: getDateList(prev.startOf("M"), state.selected),
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  selected: null,
  currentMonthStartDate: null,
  currentMonth: null,
  currentYear: null,
  weeks: null,
};

const getInitialState = () => {
  const daylist = getDateList(dayjs());
  return {
    selected: dayjs(),
    currentMonthStartDate: dayjs().startOf("M"),
    currentMonth: dayjs().format("MMMM"),
    currentYear: dayjs().format("YYYY"),
    weeks: daylist,
  };
};

const getDateList = (date: any, selected = date) => {
  const start = date.startOf("M");
  const days = [];
  for (let i = 0; i < date.daysInMonth(); i++) {
    let curr = start.add(i, "day");
    days.push({
      date: curr,
      active: true,
      isSelected: curr.isSame(selected, "day"),
    });
  }
  while (days[0].date.format("dd") != "Su") {
    let curr = dayjs(days[0].date).subtract(1, "day");
    days.unshift({
      date: curr,
      active: false,
      isSelected: false,
    });
  }
  while (days.length < 42) {
    let curr = dayjs(days[days.length - 1].date).add(1, "day");
    days.push({
      date: curr,
      active: false,
      isSelected: false,
    });
  }

  let weeks = [];
  for (let i = 0; i < 6; i += 1) {
    weeks.push(days.slice(i * 7, (i + 1) * 7));
  }
  return weeks;
};

const useCalendar = () => {
  const [state, dispatch] = useReducer(
    calendarReducer,
    initialState,
    getInitialState
  );

  const setDate = (date: any) =>
    dispatch({ type: actionTypes.setSelected, payload: date });

  const nextMonth = () => dispatch({ type: actionTypes.nextMonth });

  const prevMonth = () => dispatch({ type: actionTypes.prevMonth });

  return {
    ...state,
    state,
    setDate,
    nextMonth,
    prevMonth,
  };
};

export default useCalendar;
