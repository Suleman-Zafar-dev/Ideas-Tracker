"use client";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const Page = () => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch unique tags for this user
  async function fetchTags() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("ideas")
      .select("tag")
      .eq("user_id", user.id)
      .not("tag", "is", null);

    if (!error && data) {
      const unique = Array.from(new Set(data.map((row) => row.tag)));
      setTags(unique);
    }
  }

  useEffect(() => {
    fetchTags();
  }, []);

  async function handleSave() {
    if (!content.trim() || !tag.trim()) {
      alert("Please enter both content and tag");
      return;
    }

    setLoading(true);

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("Not signed in");
      setLoading(false);
      return;
    }

    // Insert idea
    const { error } = await supabase.from("ideas").insert({
      title: content,  // treat initial text as the title
      tag,
      user_id: user.id,
      description: "",
      notes: "",
      links: [],
      next_actions: [],
      attachments: []
    });

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert(`Idea saved under tag "${tag}"`);
      setContent("");
      setTag("");
      fetchTags(); // refresh tags list
    }
    setLoading(false);
  }

  // Filtered tags list
  const filteredTags = tags.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mx-auto w-full max-w-4xl px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-10">What’s On Your Mind?</h1>
        {/* Tag Search + Add */}
        <div className="relative mt-6">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setTag(e.target.value); // keep tag state in sync
              }}
              placeholder="Search or add a tag..."
              className="w-full border rounded-xl p-3 text-lg focus:outline-none focus:ring-2 pr-10"
            />
            {/* Plus button for new tag */}
            {search && !filteredTags.includes(search) && (
              <button
                type="button"
                onClick={() => setTag(search)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              >
                ➕
              </button>
            )}
          </div>

          {/* Tag Suggestions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {filteredTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3 py-1 rounded-full border ${
                  tag === t ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        {/* Idea Capture Box */}
        <div className="relative rounded-2xl shadow-lg p-8 space-y-6">
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your idea here..."
            className="w-full resize-none text-lg leading-relaxed border rounded-xl p-6 pr-24 focus:outline-none focus:ring-2"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex space-x-4 text-sm font-medium">
              <button type="button" aria-label="Voice to Text">
                MIC_ICON
              </button>
              <button type="button" aria-label="Upload File">
                UPLOAD_ICON
              </button>
            </div>
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
