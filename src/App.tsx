import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

  const addTodo = (value: string) => {
    if (value.length === 0) {
      return;
    }
    const newTodo: Todo = {
      id: generateUniqueId(),
      name: value,
      isChecked: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number, updatedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }
      return updatedTodo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (deleteTodo: Todo) => {
    const newTodos = todos.filter((todo) => todo.id !== deleteTodo.id);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-700 p-6 rounded-lg">
        <div>
          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-xl">
              Ajoutez un nouveau todo:
            </legend>
            <div className="join">
              <input
                type="text"
                className="input rounded-md bg-gray-600"
                placeholder="Entrez votre texte"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo(value);
                    setValue("");
                  }
                }}
              />
              <button
                className="btn btn-accent ml-3 rounded-lg"
                onClick={() => {
                  addTodo(value);
                  setValue("");
                }}
              >
                <Plus size={20} className="text-white" />
              </button>
            </div>
          </fieldset>
          <div className="divider divider-accent">Liste</div>
          <ul className="list-none mt-2">
            {todos.length !== 0
              ? todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-2 mb-2 bg-gray-600 rounded-lg p-1"
                  >
                    <input
                      className="checkbox checkbox-sm "
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => {
                        const newChecked = !todo.isChecked;
                        updateTodo(todo.id, {
                          ...todo,
                          isChecked: newChecked,
                        });
                      }}
                    />
                    <input
                      type="text"
                      defaultValue={todo.name}
                      disabled={todo.isChecked}
                      className={
                        todo.isChecked
                          ? "line-through text-green-200"
                          : " text-red-200"
                      }
                      onBlur={(e) => {
                        const newValue = e.target.value;
                        updateTodo(todo.id, {
                          ...todo,
                          name: newValue,
                        });
                      }}
                    />
                    <button
                      className="btn btn-accent ml-3 rounded-lg"
                      onClick={() => {
                        deleteTodo(todo);
                      }}
                    >
                      <Trash2 size={20} className="text-white" />
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
