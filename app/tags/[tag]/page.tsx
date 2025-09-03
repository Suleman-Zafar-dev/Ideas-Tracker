import { createClient } from "@/lib/supabase/server";

interface TagPageProps {
  params: { tag: string };
}

export default async function TagPage({ params }: TagPageProps) {
  const supabase = await createClient();
  const decodedTag = decodeURIComponent(params.tag);

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <p className="p-6">You must be signed in to view ideas.</p>;
  }

  // Fetch ideas with this tag
  const { data: ideas, error } = await supabase
    .from("ideas")
    .select("id, content, created_at")
    .eq("user_id", user.id)
    .eq("tag", decodedTag)
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="p-6">Error: {error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold mb-6">
        Ideas under tag: {decodedTag}
      </h1>

      {ideas.length === 0 ? (
        <p>No ideas saved with this tag yet.</p>
      ) : (
        <div className="rounded-xl shadow border divide-y">
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
              {/* Arrow (functionality to be added later) */}
              <span className="text-xl">›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
