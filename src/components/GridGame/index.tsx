import { ReactElement } from "react";
import { Cell } from "./gridGameTypes";
import useGridGame from "./useGridGame";
import useDropdown from "../../hooks/useDropdown";

const delays = [
  { label: "Slow", value: 500 },
  { label: "Medium", value: 250 },
  { label: "Fast", value: 100 },
];

const columnitems = [30, 40, 50, 60, 70, 80];
const rowitems = [15, 20, 25, 30, 35, 40];

function Game() {
  const {
    grid,
    activateCell,
    deactivateCell,
    delay,
    cols,
    rows,
    speed,
    start,
    stop,
    setCols,
    setRows,
    setSpeed,
  } = useGridGame();

  const toggleCell = (idx: { x: number; y: number }) => {
    if (grid[idx.x][idx.y].active) {
      deactivateCell(idx);
    } else {
      activateCell(idx);
    }
  };
  const mouseOverToggle = (e: any, idx: { x: number; y: number }) => {
    if (e.buttons === 1) {
      toggleCell(idx);
    }
  };

  return (
    <div className="min-h-screen px-10 py-8 bg-gray-900">
      <div className="pb-6">
        <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 font-mont">
          Game of Life
        </span>
        <div className="flex justify-end pt-4 space-x-10">
          <div className="flex items-baseline ">
            <label className="mr-3 text-xl font-semibold text-gray-400">
              Rows :{" "}
            </label>
            <Dropdown value={rows}>
              {rowitems.map((item) => (
                <DropdownItem
                  key={item}
                  onClick={() => setRows(item)}
                  label={item}
                />
              ))}
            </Dropdown>
          </div>
          <div className="flex">
            <label className="mr-3 text-xl font-semibold text-gray-400">
              Columns :
            </label>
            <Dropdown value={cols}>
              {columnitems.map((item) => (
                <DropdownItem
                  key={item}
                  onClick={() => setCols(item)}
                  label={item}
                />
              ))}
            </Dropdown>
          </div>
          <div className="flex">
            <label className="mr-3 text-xl font-semibold text-gray-400">
              Speed :
            </label>
            <Dropdown value={speed.label}>
              {delays.map((item) => (
                <DropdownItem
                  key={item.label}
                  onClick={() => setSpeed(item)}
                  label={item.label}
                />
              ))}
            </Dropdown>
          </div>
          <button
            className="px-4 py-1 text-lg font-semibold text-white bg-green-500 rounded-lg"
            onClick={() => (delay ? stop() : start())}
          >
            {delay ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      <div className="">
        <div
          className={`grid border-r border-b border-gray-600`}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {grid.flat().map((value, idx) => (
            <GridCell
              key={idx}
              value={value}
              mouseDown={() =>
                toggleCell({ x: Math.floor(idx / cols), y: idx % cols })
              }
              mouseOver={(e: any) =>
                mouseOverToggle(e, { x: Math.floor(idx / cols), y: idx % cols })
              }
            ></GridCell>
          ))}
        </div>
      </div>
    </div>
  );
}

const GridCell = ({
  mouseOver,
  mouseDown,
  value,
}: {
  mouseOver: any;
  mouseDown: any;
  value: Cell;
}) => {
  return (
    <div
      className={`aspect-square border-l border-t border-gray-600 ${
        value?.active ? "bg-green-300" : ""
      }`}
      onMouseDown={mouseDown}
      onMouseOver={mouseOver}
    ></div>
  );
};

const Dropdown = ({
  value,
  children,
}: {
  value: string | number;
  children: any;
}) => {
  const [containerRef, isOpen, open, close] = useDropdown();

  return (
    <div className="relative border rounded cursor-pointer" ref={containerRef}>
      <div
        aria-controls={isOpen ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={open}
        className="px-4 py-1 font-semibold text-gray-400"
      >
        {value}
      </div>
      <div
        className={`absolute z-10 left-0 max-w-fit min-w-full divide-y divide-gray-500 grid top-full  mt-1 shadow-md rounded bg-gray-700 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={close}
      >
        {children}
      </div>
    </div>
  );
};

const DropdownItem = ({ onClick, label }: { onClick: any; label: any }) => {
  return (
    <div
      className="px-3 py-1 text-white transition duration-300 hover:bg-gray-600"
      onClick={onClick}
    >
      {label}
    </div>
  );
};
export default Game;
