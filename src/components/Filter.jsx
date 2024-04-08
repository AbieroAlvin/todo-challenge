const Filter = ({ clearCompleted, setFilter, tasks, filter }) => {
  return (
    <div className="mt-6">
      <div className="text-sm flex gap-6 lg:w-[480px] w-[370px] py-3 bg-gray-100 mt-4 px-3 items-center justify-between md:hidden rounded-md text-[var(--Very-Dark-light-Grayish-Blue)] dark:bg-[var(--Very-Dark-Desaturated-Blue)] dark:text-[var(--Dark-Grayish-Blue)]">
        <span>
          <span className="text-blue-500 pr-1">
            {tasks.filter((task) => !task.completed).length}
          </span>
          items left
        </span>
        <div className="">
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
      <div className="text-sm flex gap-6 lg:w-[480px] md:w-[420px] w-[370px] py-3 bg-gray-100 mt-2 px-2 items-center rounded-md justify-center text-gray-700 ">
        <div className="md:flex hidden">
          <span className="text-[var(--Bright-Blue)] pr-1">
            {tasks.filter((task) => !task.completed).length}
          </span>{" "}
          items left
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "text-blue-800" : ""}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "text-blue-800" : ""}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "text-blue-800" : ""}
          >
            Completed
          </button>
        </div>
        <div className="md:flex hidden">
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
