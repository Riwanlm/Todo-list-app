import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

export type Todo = {
  id: number;
  name: string;
  isChecked: boolean;
};

const generateUniqueId = (): number => {
  return Number(Math.random().toString().slice(2, 8));
};

export default function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<Array<Todo>>([
    {
      id: 243748,
      name: "Faire la vaisselle",
      isChecked: false,
    },
    {
      id: 840318,
      name: "Allez courir à 17h",
      isChecked: false,
    },
    {
      id: 384034,
      name: "Faire les courses",
      isChecked: true,
    },
  ]);

  //Récupère les todos du localStorage et les ajoute au state
  useEffect(() => {
    const newTodos: Todo[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !isNaN(Number(key))) {
        const todoStorage: Todo = JSON.parse(
          localStorage.getItem(key.toString())!
        );
        newTodos.push(todoStorage);
      }
    }

    // Utilisation d'un Map pour éviter les doublons
    const uniqueTodos = [
      ...new Map(
        [...todos, ...newTodos].map((todo) => [todo.id, todo])
      ).values(),
    ];

    setTodos(uniqueTodos);
  }, []);

  const addTodo = (value: string) => {
    if (value.length === 0) {
      return;
    }
    const newTodo: Todo = {
      id: generateUniqueId(),
      name: value,
      isChecked: false,
    };
    localStorage.setItem(newTodo.id.toString(), JSON.stringify(newTodo));
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number, newTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      const updateTodoInLocalStorage = localStorage.getItem(id.toString());
      if (updateTodoInLocalStorage) {
        localStorage.removeItem(id.toString());
        localStorage.setItem(id.toString(), JSON.stringify(newTodo));
      }
      return newTodo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (deleteTodo: Todo) => {
    const newTodos = todos.filter((todo) => todo.id !== deleteTodo.id);
    const deletedTodoInStorage = localStorage.getItem(deleteTodo.id.toString());
    if (deletedTodoInStorage) {
      localStorage.removeItem(deleteTodo.id.toString());
    }
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-700 p-6 rounded-lg">
        <TodoForm value={value} setValue={setValue} addTodo={addTodo} />
        <div className="divider divider-accent">Liste</div>
        <ul className="list-none mt-2">
          <TodoItem
            todos={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </ul>
      </div>
    </div>
  );
}
