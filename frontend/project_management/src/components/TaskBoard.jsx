import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialTasks = [
  {
    id: 1,
    title: "Design Login Page",
    description: "Create responsive login page using React and Tailwind CSS.",
    priority: "High",
    status: "todo",
  },
  {
    id: 2,
    title: "Create Authentication API",
    description: "Implement JWT based authentication API.",
    priority: "Medium",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Setup Project Repository",
    description: "Initialize Git repository and project structure.",
    priority: "Low",
    status: "completed",
  },
];

const tabs = [
  {
    id: "todo",
    label: "TODO",
  },
  {
    id: "in-progress",
    label: "In Progress",
  },
  {
    id: "completed",
    label: "Completed",
  },
];

function TaskBoard({ project, task }) {
  console.log(task, "tasks");
  const [tasks, setTasks] = useState(task);
  // const [project,setProject] = useState([])
  // const [filteredTasks,setFilteredTask] = useState([])
  const [activeTab, setActiveTab] = useState("todo");

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const user = useSelector(state=> state.user.userData)
  const [selectedUser,setSelectedUser] = useState(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedTo:null
  });
  useEffect(() => {
    setTasks(task || []);
  }, [task]);

  useEffect(() => {
    setUsers(project?.users || []);
  }, [project]);

  const filteredTasks = tasks.filter((task) => task.status === activeTab);

  // Create a new task
  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: "todo",
      createdBy:""
    };

    setTasks((prev) => [...prev, task]);

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
    });

    setShowModal(false);
    setActiveTab("todo");
  };

  // Move task to another status
  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    setActiveTab(newStatus);
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };
const onAssignUser =(value)=>{
   setSelectedUser(value)
   setNewTask({
    ...newTask,
    assignedTo: value,
  })
}
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Project Tasks</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track your project tasks
          </p>
        </div>

        {/* Add Ticket Button */}
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + Add Ticket
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const count = tasks.filter((task) => task.status === tab.id).length;

            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-sm font-semibold transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl">
              ✓
            </div>

            <h3 className="font-semibold text-slate-800">No tasks here</h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no tasks in this section.
            </p>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Create Ticket
                </h2>

                <p className="text-sm text-slate-500">
                  Create a new task for your project.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Title
                </label>

                <input
                  type="text"
                  placeholder="Enter ticket title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Describe the task..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Assigned User */}{" "}
              <div>
                {" "}
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  {" "}
                  Assigned User{" "}
                </label>{" "}
                <select
                  value={selectedUser || ""}
                  onChange={(e) => onAssignUser(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {" "}
                  <option value=""> Select user </option>{" "}
                  {users?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {" "}
                      {user.name}{" "}
                    </option>
                  ))}{" "}
                </select>{" "}
              </div>
              {/* Priority */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------
   Task Card
------------------------- */

function TaskCard({ task, moveTask, deleteTask }) {
  const priorityStyle = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Low: "bg-green-50 text-green-600",
  };

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{task.title}</h3>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            priorityStyle[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
      {/* Description */}
      <p className="mb-5 text-sm leading-6 text-slate-500">
        {task.description || "No description provided."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        {/* Move dropdown */}
        <select
          value={task.status}
          onChange={(e) => moveTask(task._id, e.target.value)}
          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-600 outline-none focus:border-blue-500"
        >
          <option value="todo">TODO</option>

          <option value="in-progress">In Progress</option>

          <option value="complete">Complete</option>
        </select>

        {/* Delete */}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-xs font-medium text-slate-400 transition hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskBoard;
