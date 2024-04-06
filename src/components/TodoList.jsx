import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Load tasks from local storage on mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: uuidv4(),
      text: newTask,
      completed: false,
      isEditing: false,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText, isEditing: !task.isEditing }
        : task
    );

    setTasks(updatedTasks);
  };

  const editTodo = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask();
  };
  return (
    <section className="w-full h-[90vh] flex flex-col py-[40px] items-center mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          className="py-2 px-6 bg-gray-300 rounded-md font-semibold text-white"
          type="text"
          value={newTask}
          placeholder="Add Today's Task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => addTask(newTask)}
          className="py-2 px-4 bg-purple-400 text-white rounded-md"
        >
          Add Task
        </button>
      </form>
      <ul className="flex flex-col gap-3 mt-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex px-4 py-2 bg-blue-300 gap-2 items-center"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {task.isEditing ? (
              <EditTodoForm editTodo={editTask} task={task} />
            ) : (
              <Todo
                task={task}
                toggleComplete={toggleComplete}
                deleteTodo={removeTask}
                editTodo={editTodo}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
