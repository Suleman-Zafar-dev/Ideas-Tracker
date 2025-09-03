"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import debounce from "lodash/debounce";
import Link from "next/link";

const supabase = createClient();

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all tags created by user
  async function fetchTags() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("ideas")
      .select("tag")
      .eq("user_id", user.id);

    if (!error && data) {
      const uniqueTags = Array.from(new Set(data.map((d) => d.tag).filter(Boolean)));
      setTags(uniqueTags);
    }
  }

  // Fetch ideas with search & tag filter
  const fetchIdeas = async (searchText: string, tag: string) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    let q = supabase
      .from("ideas")
      .select("id, content, tag, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (searchText?.trim()) {
      q = q.ilike("content", `%${searchText}%`);
    }
    if (tag) {
      q = q.eq("tag", tag);
    }

    const { data, error } = await q;
    if (!error && data) setIdeas(data);
    setLoading(false);
  };

  const debouncedFetchIdeas = debounce(fetchIdeas, 300);

  useEffect(() => {
    fetchTags();
    fetchIdeas(query, selectedTag);
  }, []);

  useEffect(() => {
    debouncedFetchIdeas(query, selectedTag);
  }, [query, selectedTag]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search ideas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2"
        />
      </div>

      {/* Tag Filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedTag("")}
            className={`px-3 py-1 rounded-full border ${
              selectedTag === "" ? "bg-blue-600 text-white" : "bg-transparent"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                selectedTag === tag ? "bg-blue-600 text-white" : "bg-transparent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Ideas List */}
      <h2 className="text-lg font-semibold mb-4">Recent Ideas</h2>
      {loading ? (
        <p>Loading...</p>
      ) : ideas.length === 0 ? (
        <p>No ideas found.</p>
      ) : (
        <div className="rounded-xl shadow divide-y border">
          {ideas.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.id}`}>
              <div className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer hover:bg-muted transition">
                <div>
                  <p className="font-medium">{idea.content}</p>
                  <p className="text-sm text-muted-foreground">
                    {idea.tag ? `#${idea.tag}` : "No tag"} ·{" "}
                    {new Date(idea.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xl">›</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
