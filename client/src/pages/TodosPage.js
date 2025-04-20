import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import api from '../services/api';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/api/todos');
        setTodos(res.data);
      } catch (err) {
        setError('Error fetching todos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (newTodo) => {
    try {
      const res = await api.post('/api/todos', newTodo);
      setTodos([res.data, ...todos]);
      return { success: true };
    } catch (err) {
      setError('Error adding todo');
      console.error(err);
      return { success: false, error: 'Error adding todo' };
    }
  };

  // Update todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      const res = await api.put(`/api/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
      setSelectedTodo(null);
      return { success: true };
    } catch (err) {
      setError('Error updating todo');
      console.error(err);
      return { success: false, error: 'Error updating todo' };
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Error deleting todo');
      console.error(err);
    }
  };

  // Select todo for editing
  const selectTodoForEdit = (todo) => {
    setSelectedTodo(todo);
  };

  // Cancel editing
  const cancelEdit = () => {
    setSelectedTodo(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}
      
      <TodoForm 
        addTodo={addTodo} 
        updateTodo={updateTodo} 
        selectedTodo={selectedTodo}
        cancelEdit={cancelEdit}
      />
      
      <div className="mt-8">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet. Add one above!</p>
        ) : (
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoItem 
                key={todo._id} 
                todo={todo} 
                deleteTodo={deleteTodo} 
                selectTodoForEdit={selectTodoForEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosPage;