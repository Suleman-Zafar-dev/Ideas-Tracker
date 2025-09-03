"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { debounce } from "lodash";

const supabase = createClient();

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  // Fetch ideas (search only)
  const fetchIdeas = async (searchText: string) => {
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

    const { data, error } = await q;
    if (!error && data) setIdeas(data);
  };

  const debouncedFetchIdeas = debounce(fetchIdeas, 300);

  useEffect(() => {
    fetchIdeas(query);
  }, []);

  useEffect(() => {
    debouncedFetchIdeas(query);
  }, [query]);

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

      {/* Ideas List */}
      <h2 className="text-lg font-semibold mb-4">Recent Ideas</h2>
      {ideas.length === 0 ? (
        <p>No ideas found.</p>
      ) : (
        <div className="rounded-xl shadow divide-y border">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition"
            >
              <div>
                <p className="font-medium">{idea.content}</p>
                <p className="text-sm">
                  {new Date(idea.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="text-xl">›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
