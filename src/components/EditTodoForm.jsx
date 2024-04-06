import { useState } from "react";
import { FaSave } from "react-icons/fa";

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();

    editTodo(task.id, value);
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={value}
        placeholder="UpdateTask"
        onChange={(e) => setValue(e.target.value)}
        className="px-2 py-1 rounded-md outline-none focus:outline-green-400"
      />
      <button type="submit" className="cursor-pointer">
        <FaSave />
      </button>
    </form>
  );
};

export default EditTodoForm;
