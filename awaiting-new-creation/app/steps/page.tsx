"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
type Task = {
  id: number;
  text: string;
  category: "daily" | "project";
  completed: boolean;
  impact: string; // short impact message
  buddy?: string;
  co2Saved?: number;
};

const initialTasks: Task[] = [
  // 🌱 Daily habits
  { id: 1, text: "Bring your own reusable cup", category: "daily", completed: false, impact: "Saved 1 disposable cup" },
  { id: 2, text: "Take public transport instead of driving", category: "daily", completed: false, impact: "Reduced 2kg CO₂" },
  { id: 3, text: "Eat one plant-based meal", category: "daily", completed: false, impact: "Lowered food footprint" },

  // 🤝 Community projects
  { id: 4, text: "Start a compost bin at home", category: "project", completed: false, impact: "Diverted food waste from landfill", co2Saved:1},
  { id: 5, text: "Join a park/beach cleanup", category: "project", completed: false, impact: "Helped restore biodiversity", co2Saved:2},
  { id: 6, text: "Community Fridge 2.0 (share surplus food in HDB)", category: "project", completed: false, impact: "Feeds 50 families weekly if scaled" },
  { id: 7, text: "Clothes Swap Nights at Void Decks", category: "project", completed: false, impact: "Brings neighbours together + reduces waste", co2Saved:3},
];

export default function SustainabilityTodo() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      const savedTasks: Task[] = JSON.parse(stored);

      // Avoid duplicating initial tasks
      const savedIds = new Set(savedTasks.map((t) => t.id));
      const merged = [
        ...initialTasks.filter((t) => !savedIds.has(t.id)),
        ...savedTasks,
      ];

      setTasks(merged);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [impactMessages, setImpactMessages] = useState<string[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const toggleTask = (id: number) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, completed: !task.completed, co2Saved: task.co2Saved || 2 } : task
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
    id: Date.now(), // unique id
    text: newTaskText,
    category: "daily",
    completed: false,
    impact: "You're an eco-champion!",
  };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const dailyTasks = tasks.filter((t) => t.category === "daily");
  const projectTasks = tasks.filter((t) => t.category === "project");


  const assignBuddy = (id: number, buddy: string) => {
    setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, buddy } : t))
    );
  };
const router = useRouter();
const resetTasks = () => {
  setTasks(initialTasks);          // reset state
  localStorage.removeItem("tasks"); // clear persisted tasks
};
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
        <h2 className="text-l text-gray-600 text-center line-clamp-3 mb-3 italic">
        Tag a buddy to join this task—small actions feel bigger when shared!
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
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {task.text}
      </span>
    </button>

    {/* Buddy dropdown */}
    <select
      value={task.buddy || ""}
      onChange={(e) => assignBuddy(task.id, e.target.value)}
      className="ml-3 border border-gray-300 rounded px-2 py-1 text-sm text-gray-400"
    >
      <option value="">Tag a buddy</option>
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Charlie">Charlie</option>
    </select>

    {/* ✅ Inline buddy impact */}
    {task.completed && task.buddy && (
      <div className="ml-4 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-lg">
        You + {task.buddy} saved {task.co2Saved ?? "2kg"} CO₂ 🌱
      </div>
    )}
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
    {/* Buddy Impact Box
    <div className="mt-6 max-w-xl mx-auto bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm text-center">
        <h3 className="text-lg font-semibold text-green-700 mb-2">
            👯 Buddy Impact
        </h3>
        <p className="text-gray-700">
            You + <span className="font-medium">{buddyName || "your buddy"}</span> 
            have saved <span className="font-semibold text-green-700">{buddyImpact}</span> so far! 🌍
        </p>
    </div> */}
    {/* <button
  onClick={resetTasks}
  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
>
  Reset Tasks
</button> */}
  

<button
  onClick={() => router.push("/news")}
  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition mb-6"
>
  ← Back to News
</button>
    </main>
);
    };
