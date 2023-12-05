import { useState } from "react";
import "../style.css";
import supabase from "../supabase";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

export default function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUpLoading, setIsUpLoading] = useState(false);
  const textLength = text.length;

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function handleSubmit(e) {
    // prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // create a new fact object
      setIsUpLoading(true);
      const { data: newFact, error } = await supabase
        .from("fact")
        .insert([{ text, source, category }])
        .select();
      if (!error) setIsUpLoading(false);

      // add the new fact to the UI (add the fact to state)
      setFacts((facts) => [newFact[0], ...facts]);
    }

    // clean and close the form
    setText("");
    setSource("");
    setCategory("");
    setShowForm(false);
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUpLoading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUpLoading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUpLoading}
      >
        <option value="">Category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUpLoading}>
        Post
      </button>
    </form>
  );
}
