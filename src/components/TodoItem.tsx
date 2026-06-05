import { useState } from 'react';
import { Check, Trash2, Pencil, X } from 'lucide-react';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {todo.completed && <Check size={14} />}
      </button>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-gray-800 ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
              title="Save"
            >
              <Check size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
              title="Cancel"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
