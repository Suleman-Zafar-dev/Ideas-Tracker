import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function TagsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <p className="p-6">You must be signed in to view tags.</p>;
  }

  const { data, error } = await supabase
    .from("ideas")
    .select("tag")
    .eq("user_id", user.id)
    .not("tag", "is", null);

  if (error) {
    return <p className="p-6 text-destructive">Error: {error.message}</p>;
  }

  const uniqueTags = Array.from(new Set(data.map((row) => row.tag)));

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-muted-foreground">
            Manage your tagging system to organize your business ideas.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition">
          + New Tag
        </button>
      </div>

      {/* Tags List */}
      <div className="bg-card rounded-md shadow-sm border border-border">
        <h2 className="px-4 py-2 font-semibold border-b border-border">All Tags</h2>
        {uniqueTags.length === 0 ? (
          <p className="p-4 text-muted-foreground">No tags yet. Save an idea with a tag!</p>
        ) : (
          <ul>
            {uniqueTags.map((tag) => (
              <li
                key={tag}
                className="flex justify-between items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted transition"
              >
                <Link
                  href={`/tags/${encodeURIComponent(tag!)}`}
                  className="font-medium hover:underline"
                >
                  {tag}
                </Link>
                <Link
                  href={`/tags/${encodeURIComponent(tag!)}/edit`}
                  className=" hover:underline text-sm"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
