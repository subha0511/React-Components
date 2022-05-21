import React from "react";
import useCalendar from "./useCalendar";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

function Calendar() {
  const {
    weeks,
    setDate,
    selected,
    currentMonth,
    currentYear,
    prevMonth,
    nextMonth,
  } = useCalendar();

  return (
    <>
      <div className="">
        <div className="max-w-xs p-5">
          <div className="flex items-end justify-between">
            <div className="text-xl font-bold text-gray-800 uppercase">
              {currentMonth + " " + currentYear}
            </div>
            <div className="flex items-baseline justify-start space-x-2 text-gray-500">
              <div
                className="rounded-full cursor-pointer hover:bg-gray-50 hover:text-gray-800"
                onClick={prevMonth}
              >
                <BiChevronLeft size={25} className="pointer-events-none" />
              </div>
              <div
                className="rounded-full cursor-pointer hover:bg-gray-50 hover:text-gray-800"
                onClick={nextMonth}
              >
                <BiChevronRight size={25} className="pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-2 text-xs leading-6 text-center text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          <div className="flex flex-col mt-2 text-sm border divide-y rounded-lg">
            {weeks?.map((week: any, idx: Number) => (
              <div className="flex flex-row divide-x" key={String(idx)}>
                {week?.map((item: any) => (
                  <div
                    key={String(item?.date)}
                    className={`flex items-center justify-center transition-all duration-200 h-10 w-8 grow cursor-pointer  ${
                      item?.active
                        ? "hover:bg-blue-100"
                        : "text-gray-400 hover:bg-gray-100"
                    } ${item?.isSelected ? "bg-green-100 font-medium" : ""}
                    `}
                    onClick={() => setDate(item?.date)}
                  >
                    {`${item?.date?.format("D")}`}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
