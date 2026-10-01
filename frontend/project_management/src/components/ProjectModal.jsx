 import { useEffect, useState } from "react";
import { getAllUser } from "../calls/authCall";
import { createProject } from "../calls/projectCall";
import { useDispatch, useSelector } from "react-redux";

const CreateProjectModal = ({
  users = [],
  onClose,
  onProjectCreated,
}) => {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    users: [],
    status: "active",
  });

const user = useSelector(state=> state.user.userData)
const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multiple users
  const handleUserChange = (e) => {
    const selectedUsers = Array.from(
      e.target.selectedOptions
    ).map((option) => option.value);

    setProjectData((prev) => ({
      ...prev,
      users: selectedUsers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!projectData.name.trim()) {
      return;
    }
     
    const data = {
        name:projectData.name,
        description: projectData.description,
        users: projectData.users,
        status: projectData.status,
        createdBy:user._id
    }
    try {
      // Your API call
      const response = await createProject(data);

       if (onProjectCreated) {
        onProjectCreated(response.data);
      }

      onClose();

    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Project
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <textarea
              name="description"
              value={projectData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Users */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Users
            </label>

            <select
              multiple
              value={projectData.users}
              onChange={handleUserChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name} ({user.email})
                </option>
              ))}
            </select>

            <p className="text-xs text-gray-500 mt-1">
              Hold Ctrl/Cmd to select multiple users.
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>

            <select
              name="status"
              value={projectData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Project
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
