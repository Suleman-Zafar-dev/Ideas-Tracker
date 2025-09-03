"use client";
import Footer from '@/components/footer'
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const Page = () => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("Not signed in");
      setLoading(false);
      return;
    }

    // Insert idea with user_id + tag
    const { error } = await supabase.from("ideas").insert({
      content,
      tag,
      user_id: user.id,
    });

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert(`Idea saved under tag "${tag}"`);
      setContent("");
      setTag("");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mx-auto w-full max-w-4xl px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-10">What’s On Your Mind?</h1>

        {/* Idea Capture Box */}
        <div className="relative rounded-2xl shadow-lg p-8 space-y-6">
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your idea here..."
            className="w-full resize-none text-lg leading-relaxed border rounded-xl p-6 pr-24 focus:outline-none focus:ring-2"
          />

          {/* Tag Input */}
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Add a tag (e.g. marketing)"
            className="w-full border rounded-xl p-3 text-lg focus:outline-none focus:ring-2"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between mt-4">
            {/* Left icons placeholders */}
            <div className="flex space-x-4 text-sm font-medium">
              <button type="button" aria-label="Voice to Text">MIC_ICON</button>
              <button type="button" aria-label="Upload File">UPLOAD_ICON</button>
            </div>

            {/* Right Save button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg px-6 py-2 font-semibold shadow-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
