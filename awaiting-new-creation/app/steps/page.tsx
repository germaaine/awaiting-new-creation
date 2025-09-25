"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";

type Task = {
  id: number;
  text: string;
  category: "daily" | "project";
  completed: boolean;
  impact: string; // short impact message
};

const initialTasks: Task[] = [
  // 🌱 Daily habits
  { id: 1, text: "Bring your own reusable cup", category: "daily", completed: false, impact: "Saved 1 disposable cup" },
  { id: 2, text: "Take public transport instead of driving", category: "daily", completed: false, impact: "Reduced 2kg CO₂" },
  { id: 3, text: "Eat one plant-based meal", category: "daily", completed: false, impact: "Lowered food footprint" },

  // 🤝 Community projects
  { id: 4, text: "Start a compost bin at home", category: "project", completed: false, impact: "Diverted food waste from landfill" },
  { id: 5, text: "Join a park/beach cleanup", category: "project", completed: false, impact: "Helped restore biodiversity" },
  { id: 6, text: "Community Fridge 2.0 (share surplus food in HDB)", category: "project", completed: false, impact: "Feeds 50 families weekly if scaled" },
  { id: 8, text: "Clothes Swap Nights at Void Decks", category: "project", completed: false, impact: "Brings neighbours together + reduces waste" },
];

export default function SustainabilityTodo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [impactMessages, setImpactMessages] = useState<string[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const toggleTask = (id: number) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );

  const task = tasks.find((t) => t.id === id);
  if (task && !task.completed) {
    setImpactMessages((prev) => [...prev, `🎉 ${task.impact}`]);
    setTimeout(() => {
      setImpactMessages((prev) => prev.slice(1));
    }, 3000);
  }
};


  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: tasks.length + 1,
      text: newTaskText,
      category: "daily", // default new tasks as daily
      completed: false,
      impact: "You're an eco-champion!",
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const dailyTasks = tasks.filter((t) => t.category === "daily");
  const projectTasks = tasks.filter((t) => t.category === "project");

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌱 My Sustainability To-Do List
      </h1>

      {/* Add Task Input */}
      <div className="max-w-xl mx-auto flex gap-2 mb-6">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add your own task..."
          className="flex-grow border border-gray-700 rounded-lg p-2 bg-gray-100 focus:ring-2 focus:ring-green-500 placeholder-gray-600 text-gray-800"
        />
        <button
          onClick={addTask}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-700"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Daily / Personal Actions */}
      <section className="max-w-xl mx-auto mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-3">
          🌱 Daily / Personal Actions
        </h2>
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg transition ${
                task.completed ? "bg-green-50" : "hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-3 w-full text-left"
              >
                {task.completed ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <Circle className="text-gray-400" />
                )}
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Community / Project Actions */}
      <section className="max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-green-700 mb-3">
          🤝 Community / Big Change Projects
        </h2>
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          {projectTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg transition ${
                task.completed ? "bg-green-50" : "hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-3 w-full text-left"
              >
                {task.completed ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <Circle className="text-gray-400" />
                )}
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Progress tracker */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          You’ve completed{" "}
          <span className="font-semibold text-green-700">
            {completedCount}/{tasks.length}
          </span>{" "}
          tasks ✅
        </p>
        <div className="w-full max-w-xl mx-auto bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pop-up impact messages */}
      <div className="fixed bottom-5 right-5 space-y-2">
        {impactMessages.map((msg, i) => (
          <div
            key={i}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce"
          >
            {msg}
          </div>
        ))}
      </div>
    </main>
  );
}
