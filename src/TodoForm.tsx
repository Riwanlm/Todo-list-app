import { Plus } from "lucide-react";

type TodoFormProps = {
  value: string;
  setValue: (newValue: string) => void;
  addTodo: (value: string) => void;
};

export const TodoForm = ({ value, setValue, addTodo }: TodoFormProps) => {
  return (
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
  );
};
