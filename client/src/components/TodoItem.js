import React from 'react';

const TodoItem = ({ todo, deleteTodo, selectTodoForEdit }) => {
  const { _id, title, description, status, imageUrl, createdAt } = todo;

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="md:flex">
        {imageUrl && (
          <div className="md:flex-shrink-0">
            <img 
              className="h-48 w-full object-cover md:w-48" 
              src={`http://localhost:5001${imageUrl}`} 
              alt={title} 
            />
          </div>
        )}
        <div className="p-6 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {formatDate(createdAt)}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">{title}</h3>
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusColor(status)}`}>
                {status}
              </span>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => selectTodoForEdit(todo)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => deleteTodo(_id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;