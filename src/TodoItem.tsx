import { Trash2 } from "lucide-react";
import { Todo } from "./App";

type TodoItemProps = {
  todos: Todo[];
  updateTodo: (id: number, newTodo: Todo) => void;
  deleteTodo: (deleteTodo: Todo) => void;
};

export const TodoItem = ({ todos, updateTodo, deleteTodo }: TodoItemProps) => {
  return (
    <>
      {todos.length !== 0 ? (
        todos.map((todo) => (
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
                todo.isChecked ? "line-through text-green-200" : " text-red-200"
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
      ) : (
        <p className="text-accent">Ajoutez de nouveaux todos à votre liste !</p>
      )}
    </>
  );
};
