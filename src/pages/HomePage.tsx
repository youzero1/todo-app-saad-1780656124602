import { useTodos } from '@/hooks/useTodos';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos();

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-lg mx-auto pt-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
          <span>{activeCount} items left</span>
          {todos.some((todo) => todo.completed) && (
            <button
              onClick={clearCompleted}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
