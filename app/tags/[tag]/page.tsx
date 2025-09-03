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
    return <p className="p-6 text-red-600">Error: {error.message}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Ideas under tag: {params.tag}
      </h1>

      {ideas.length === 0 ? (
        <p className="text-gray-500">No ideas saved with this tag yet.</p>
      ) : (
        <ul className="space-y-4">
          {ideas.map((idea: { id: string; content: string; created_at: string }) => (
            <li key={idea.id} className="border p-4 rounded-lg shadow">
              <p className="text-lg">{idea.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(idea.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
