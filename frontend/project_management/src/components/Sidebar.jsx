import { useState } from "react";
import CreateProjectModal from "./ProjectModal";

const Sidebar = ({
  projects,
  selectedProject,
  onProjectSelect,
  users,
  onProjectCreated,
}) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <aside className="w-64 bg-gray-50 border-r min-h-[calc(100vh-4rem)] p-4">

        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold text-gray-800">
            Projects
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white w-8 h-8 rounded-md hover:bg-blue-700 transition"
          >
            +
          </button>

        </div>

        {/* Project List */}
        <div className="space-y-2">

          {projects.map((project) => (

            <button
              key={project._id}
              onClick={() => onProjectSelect(project)}
              className={`w-full text-left px-4 py-3 rounded-md transition ${
                selectedProject?._id === project._id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {project.name}
            </button>

          ))}

        </div>

      </aside>

      {/* Create Project Modal */}
      {showModal && (
        <CreateProjectModal
          users={users}
          onClose={() => setShowModal(false)}
          onProjectCreated={onProjectCreated}
        />
      )}
    </>
  );
};

export default Sidebar;

