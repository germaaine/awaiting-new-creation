"use client";
import { Task } from "../../types"; // adjust path as needed
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Article = {
  title: string;
  summary: string;
  url: string;
  image: string;
  source: string;
  why: string;
  task: string;
};

const articles: Article[] = [
  {
    title: "Singapore secures US$510M for green infrastructure in Asia",
    summary:
      "The Monetary Authority of Singapore has secured USD 510 million to support renewable energy, transport, and sustainable projects across Asia.",
    url: "https://www.reuters.com/sustainability/climate-energy/singapore-central-bank-secures-510-million-back-green-infrastructure-asia-2025-09-08/",
    image:
      "https://www.reuters.com/resizer/v2/ZD6FOBJMRRL6FOMQ7SUK3YJS5Y.jpg?auth=28a850d7bb3f967e098e5c2db2b2f1ddbdd66b36b5492ea3bcfa5e99c01dd05c&width=1200&quality=80",
    source: "Reuters",
    why: "Green infrastructure creates jobs, cuts pollution, and builds a healthier future for cities like Singapore.",
    task: "Choose public transport instead of driving at least once this week 🚆",
  },
  {
    title: "Flax: The historic plant making a comeback",
    summary:
      "The plant is being looked at as a tool to restore soil health and even help decarbonise manufacturing.",
    url: "https://www.bbc.com/news/articles/cq8eyzznv0qo",
    image:
      "https://ichef.bbci.co.uk/news/1536/cpsprodpb/740e/live/5cac4c80-8fdf-11f0-b986-51c52739b2d9.jpg.webp",
    source: "BBC",
    why: "Flax can clean up soils and reduce reliance on polluting materials like polyester.",
    task: "Pick clothes made from natural fibres 🌿",
  },
  {
    title: "The Guardian’s Climate Pledge 2025",
    summary:
      "The Guardian commits to reducing emissions 67% by 2030, highlights grassroots climate solutions, and avoids fossil fuel advertising.",
    url: "https://www.theguardian.com/environment/ng-interactive/2025/sep/17/the-guardian-climate-pledge-2025",
    image:
      "https://i.guim.co.uk/img/media/8ed3a3312c8550ba8b109119e7c9da35c7c6f77e/0_0_2000_2500/master/2000.jpg?width=620&dpr=2&s=none&crop=none",
    source: "The Guardian",
    why: "Big organisations shifting their business models proves climate action is possible at scale.",
    task: "Support brands that are transparent about their sustainability commitments ✅",
  },
  {
      title: "Regenerative urban design reshapes cities",
      summary:
        "Cities like Singapore are adopting regenerative design to restore ecosystems, biodiversity, and community well-being.",
      url: "https://www.businessinsider.com/sc/how-cities-are-reshaping-urban-development-for-sustainability",
      image: "https://i.insider.com/685bf4fb85e81483682cb867?width=2000&format=jpeg&auto=webp",
      source: "Business Insider",
      why: "Cities designed to work with nature — not against it — can restore biodiversity, cool down heat islands, and improve quality of life for everyone.",
      task: "Add more green to your living space 🌿 — start a small balcony garden or bring in a houseplant to support urban biodiversity.",
    },
    {
      title: "Surging temperatures hit Bangladesh health and economy",
      summary:
        "Bangladesh is facing mounting health risks and economic costs from surging temperatures, with extreme heat costing the country up to US$1.78 billion last year.",
      url: "https://www.channelnewsasia.com/sustainability/surging-temperatures-hit-bangladesh-health-and-economy-5354106",
      image:
        "https://dam.mediacorp.sg/image/upload/s--F81kGdGE--/c_crop,h_576,w_1024,x_0,y_106/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_mediacorp:cna:watermark:2023-11:afp_watermark_14112023,w_0.1/f_auto,q_auto/v1/mediacorp/cna/image/2025/09/17/000_34qh4ta.jpg?itok=ANGqcNpI",
      source: "CNA",
      why: "Extreme heat isn’t just uncomfortable — it threatens lives, food security, and entire economies, reminding us how urgent climate action is globally.",
      task: "Cut your personal heat footprint 🔌 — turn off unused electronics and use fans instead of aircon when possible."
    },
    {
      title: "Ballots, Bins, and Bytes: Rethinking the Environmental Footprint of Elections in Singapore",
      summary:
        "In a world where almost everything has gone digital — from banking to paying for drinks — why are we still voting with paper? And, more importantly, what’s the environmental cost?",
      url: "https://www.greennudge.sg/post/ballots-bins-and-bytes-rethinking-the-environmental-footprint-of-elections-in-singapore",
      image:
        "https://cdn.prod.website-files.com/5f9fb3dd38e0ce15a58b69a4/683d79d10588c42c22474ef7_Ballots%2C%20Bins%2C%20and%20Bytes%20Blog%20Post%20Image.png",
      source: "CNA",
      why: "Even everyday civic processes like elections carry hidden environmental costs. Rethinking them shows how sustainability can be integrated everywhere.",
      task: "Go paperless whenever you can 📱 — switch to e-bills, e-receipts, or digital forms instead of printing."
    }
];

export default function NewsPage() {
  const [tasks, setTasks] = useState<string[]>([]);

const addTask = (task: string) => {
  const stored = localStorage.getItem("tasks");
  const existing = stored ? JSON.parse(stored) : [];

  // prevent duplicates by checking text
  if (existing.some((t: Task) => t.text === task)) {
    alert("Task already in your list ✅");
    window.location.href = "/steps";
    return;
  }

  const newTask: Task = {
    id: Date.now(),
    text: task,
    category: "daily",
    completed: false,
    impact: "You're an eco-champion! 🌱",
  };

  const updated = [...existing, newTask];
  localStorage.setItem("tasks", JSON.stringify(updated));

  alert(`Added to your to-do list: ${task}`);
  window.location.href = "/steps";
};

const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-green-700">
        🌱 Growing in Sustainability
      </h1>
      <h2 className="text-l text-gray-600 text-center line-clamp-3 mb-3">
        “We won’t protect what we don’t value, and we won’t value what we don’t
        understand.” — Sir David Attenborough.
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.url}
            className="group rounded-2xl shadow-md overflow-hidden bg-white transition hover:shadow-xl hover:-translate-y-1 flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800 group-hover:text-green-600">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
               {article.summary}
              </p>
              <p className="text-sm text-green-700 font-medium mb-3">
                🌍 Why it matters: {article.why}
              </p>
              <button
                onClick={() => {
                  addTask(article.task);
                }}
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
              >
                ➕ Add Task: {article.task}
              </button>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs text-gray-500 underline"
              >
                Read full article →
              </a>
            </div>
          </div>
        ))}
      </div>

  <button
  onClick={() => router.push("/steps")}
  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mb-6"
>
  🌱 Go to My To-Do List
</button>

    </main>
  );
}
