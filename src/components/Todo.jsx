import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="flex items-center justify-between space-x-4 min-w-[300px]">
      <p
        className={`${task.completed ? "line-through" : ""}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.text}
      </p>
      <div className="flex gap-2">
        <FaEdit onClick={() => editTodo(task.id)} className="cursor-pointer" />
        <FaTrashAlt
          onClick={() => deleteTodo(task.id)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Todo;
