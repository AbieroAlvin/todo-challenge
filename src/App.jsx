import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center md:bg-[url(src/assets/background-pattern-desktop.svg)] bg-[url(src/assets/background-pattern-mobile.svg)] bg-cover bg-no-repeat bg-top">
      <TodoList />
    </div>
  );
}

export default App;
