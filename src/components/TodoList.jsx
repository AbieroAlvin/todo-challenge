import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Filter from "./Filter";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

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

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !task.completed;
    } else {
      return task.completed;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask();
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...filteredTasks];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);
      return setTasks(reorderedStores);
    }
  };
  return (
    <section className="w-full h-[90vh] flex flex-col py-[40px] items-center mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
      <DragDropContext onDragEnd={handleDragDrop}>
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 w-full items-center justify-center"
        >
          <input
            className="py-2 px-6 bg-gray-800 rounded-md font-semibold text-white lg:max-w-[480px]"
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
        <Droppable droppableId="todo-list" type="group">
          {(provided) => (
            <div
              className="flex flex-col gap-3 mt-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((task, index) => (
                <Draggable draggableId={task.id} key={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div>
        <Filter
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          tasks={tasks}
          filter={filter}
        />
      </div>
      <div className="mt-8 text-center text-blue-700">
        <p>Drag and drop to reorder list</p>
      </div>
    </section>
  );
};

export default TodoList;
