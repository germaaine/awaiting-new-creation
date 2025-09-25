"use client";

import Image from "next/image";

type Article = {
  title: string;
  summary: string;
  url: string;
  image: string;
  source: string;
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
  },
  {
    title: "Flax: The historic plant making a comeback",
    summary:
      "The plant is being looked at as a tool to restore soil health and even help decarbonise manufacturing.",
    url: "https://www.bbc.com/news/articles/cq8eyzznv0qo",
    image:
      "https://ichef.bbci.co.uk/news/1536/cpsprodpb/740e/live/5cac4c80-8fdf-11f0-b986-51c52739b2d9.jpg.webp",
    source: "BBC",
  },
  {
    title: "The Guardian’s Climate Pledge 2025",
    summary:
      "The Guardian commits to reducing emissions 67% by 2030, highlights grassroots climate solutions, and avoids fossil fuel advertising.",
    url: "https://www.theguardian.com/environment/ng-interactive/2025/sep/17/the-guardian-climate-pledge-2025",
    image:
      "https://i.guim.co.uk/img/media/8ed3a3312c8550ba8b109119e7c9da35c7c6f77e/0_0_2000_2500/master/2000.jpg?width=620&dpr=2&s=none&crop=none",
    source: "The Guardian",
  },
  {
    title: "Regenerative urban design reshapes cities",
    summary:
      "Cities like Singapore are adopting regenerative design to restore ecosystems, biodiversity, and community well-being.",
    url: "https://www.businessinsider.com/sc/how-cities-are-reshaping-urban-development-for-sustainability",
    image: "https://i.insider.com/685bf4fb85e81483682cb867?width=2000&format=jpeg&auto=webp",
    source: "Business Insider",
  },
  {
    title: "Surging temperatures hit Bangladesh health and economy",
    summary:
      "Bangladesh is facing mounting health risks and economic costs from surging temperatures, with extreme heat costing the country up to US$1.78 billion last year.",
    url: "https://www.channelnewsasia.com/sustainability/surging-temperatures-hit-bangladesh-health-and-economy-5354106",
    image:
      "https://dam.mediacorp.sg/image/upload/s--F81kGdGE--/c_crop,h_576,w_1024,x_0,y_106/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_mediacorp:cna:watermark:2023-11:afp_watermark_14112023,w_0.1/f_auto,q_auto/v1/mediacorp/cna/image/2025/09/17/000_34qh4ta.jpg?itok=ANGqcNpI",
    source: "CNA",
  },
  {
    title: "Ballots, Bins, and Bytes: Rethinking the Environmental Footprint of Elections in Singapore",
    summary:
      "In a world where almost everything has gone digital — from banking to paying for drinks — why are we still voting with paper? And, more importantly, what’s the environmental cost of doing so?",
    url: "https://www.greennudge.sg/post/ballots-bins-and-bytes-rethinking-the-environmental-footprint-of-elections-in-singapore",
    image:
      "https://cdn.prod.website-files.com/5f9fb3dd38e0ce15a58b69a4/683d79d10588c42c22474ef7_Ballots%2C%20Bins%2C%20and%20Bytes%20Blog%20Post%20Image.png",
    source: "CNA",
  },
  
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-4xl font-bold mb-10 text-center text-green-700">
        🌱 Growing in Sustainability
    </h1>
    <h2 className="text-l text-gray-600 text-center line-clamp-3 mb-3">
        “We won’t protect what we don’t value, and we won’t value what we don’t understand.” — Sir David Attenborough.
    </h2>
    
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl shadow-md overflow-hidden bg-white transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative h-48 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800 group-hover:text-green-600">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {article.summary}
              </p>
              <span className="text-xs text-green-700 font-medium">
                {article.source}
              </span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
