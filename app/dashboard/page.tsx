"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, Zap } from "lucide-react";

const supabase = createClient();

export default function DashboardPage() {
  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("ideas")
      .select("id, title, description, tag, attachments, next_actions, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setIdeas(data);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {ideas.length === 0 ? (
        <p className="text-muted-foreground">No ideas yet. Start by creating one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => {
            const hasAttachments = idea.attachments?.length > 0;
            const completedActions = idea.next_actions?.filter((a: any) => a.done).length || 0;
            const pendingActions = idea.next_actions?.filter((a: any) => !a.done).length || 0;

            return (
              <Link key={idea.id} href={`/ideas/${idea.id}`}>
                <Card className="cursor-pointer transition hover:shadow-md hover:bg-accent">
                  <CardContent className="p-4 space-y-2">
                    {/* Title */}
                    <h2 className="font-semibold truncate">{idea.title || "Untitled Idea"}</h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {idea.description || "No description added"}
                    </p>

                    {/* Tag + Date */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {idea.tag && <Badge variant="secondary">{idea.tag}</Badge>}
                      <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                    </div>

                    {/* Status Icons */}
                    <div className="flex items-center gap-2 text-muted-foreground pt-2">
                      {hasAttachments && <FileText size={16} />}
                      {completedActions > 0 && <CheckCircle2 size={16} />}
                      {pendingActions > 0 && <Zap size={16} />}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
