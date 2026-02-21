import React, { useState } from "react";
import API from "../utils/api";

const SearchBox = () => {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    const response = await API.post("/research/", { topic });
    setResult(response.data.summary);
  };

  return (
    <div className="p-6">
      <input
        className="border p-2 w-full"
        placeholder="Enter research topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleSearch}
      >
        Generate
      </button>

      {result && (
        <div className="mt-4 p-4 border">
          <h3 className="font-bold">Summary:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;