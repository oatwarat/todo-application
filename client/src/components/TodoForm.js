import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, updateTodo, selectedTodo, cancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Not Started',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { title, description, status } = formData;

  // Reset form when selectedTodo changes
  useEffect(() => {
    if (selectedTodo) {
      setFormData({
        title: selectedTodo.title || '',
        description: selectedTodo.description || '',
        status: selectedTodo.status || 'Not Started',
        image: null
      });
      setPreview(selectedTodo.imageUrl ? `http://localhost:5001${selectedTodo.imageUrl}` : null);
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Not Started',
        image: null
      });
      setPreview(null);
    }
  }, [selectedTodo]);

  const onChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
      
      // Create preview
      if (e.target.files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setPreview(selectedTodo?.imageUrl ? `http://localhost:5001${selectedTodo.imageUrl}` : null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setFormError(null);
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (!title) {
      setFormError('Title is required');
      return;
    }

    setLoading(true);

    // Create FormData object for file upload
    const todoData = new FormData();
    todoData.append('title', title);
    todoData.append('description', description);
    todoData.append('status', status);
    if (formData.image) {
      todoData.append('image', formData.image);
    }

    try {
      let result;
      
      if (selectedTodo) {
        // Update todo
        result = await updateTodo(selectedTodo._id, todoData);
      } else {
        // Add todo
        result = await addTodo(todoData);
      }

      if (result.success) {
        // Reset form
        setFormData({
          title: '',
          description: '',
          status: 'Not Started',
          image: null
        });
        setPreview(null);
      } else {
        setFormError(result.error);
      }
    } catch (error) {
      setFormError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">
        {selectedTodo ? 'Edit Todo' : 'Add Todo'}
      </h2>
      
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{formError}</span>
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Todo Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Todo Description"
            name="description"
            value={description}
            onChange={onChange}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
    Status
  </label>
  <div className="relative">
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
      id="status"
      name="status"
      value={status}
      onChange={onChange}
    >
      <option value="Not Started">Not Started</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image (Optional)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={onChange}
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="h-32 object-cover rounded" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              selectedTodo ? 'Update Todo' : 'Add Todo'
            )}
          </button>
          {selectedTodo && (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;