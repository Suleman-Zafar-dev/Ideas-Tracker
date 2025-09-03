"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Loader2, Link as LinkIcon, Upload, File } from "lucide-react";

const supabase = createClient();

export default function IdeaDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [links, setLinks] = useState<string[]>([""]);
  const [nextActions, setNextActions] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);

  useEffect(() => {
    fetchIdea();
  }, [id]);

  async function fetchIdea() {
    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setTitle(data.title || "");
    setDescription(data.description || "");
    setNotes(data.notes || "");
    setLinks(data.links || [""]);
    setNextActions(data.next_actions || []);
    setAttachments(data.attachments || []);
    setLoading(false);
  }

  async function handleSave() {
    const { error } = await supabase
      .from("ideas")
      .update({
        title,
        description,
        notes,
        links,
        next_actions: nextActions,
        attachments,
      })
      .eq("id", id);

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert("✅ Idea updated!");
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const filePath = `${id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("attachments")
      .upload(filePath, file);

    if (uploadError) {
      alert("File upload failed: " + uploadError.message);
      return;
    }

    setAttachments((prev) => [...prev, filePath]);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">💡 Idea Details</h1>

      {/* Title + Description */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter idea title"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
          />
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Extra notes or thoughts..."
          />
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-gray-500" />
              <Input
                value={link}
                onChange={(e) => {
                  const updated = [...links];
                  updated[i] = e.target.value;
                  setLinks(updated);
                }}
                placeholder="https://example.com"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setLinks([...links, ""])}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add link
          </Button>
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <Upload className="h-4 w-4 text-gray-600" />
            <span className="text-sm">Upload a file</span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <ul className="space-y-2">
            {attachments.map((path, i) => (
              <li key={i}>
                <AttachmentLink path={path} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Next Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Next Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nextActions.map((action, i) => (
            <div key={i} className="flex items-center gap-3">
              <Checkbox
                checked={action.done}
                onCheckedChange={() => {
                  const updated = [...nextActions];
                  updated[i].done = !updated[i].done;
                  setNextActions(updated);
                }}
              />
              <Input
                value={action.text}
                onChange={(e) => {
                  const updated = [...nextActions];
                  updated[i].text = e.target.value;
                  setNextActions(updated);
                }}
                placeholder="Next action..."
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setNextActions([...nextActions, { text: "", done: false }])
            }
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add action
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} className="px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// Separate component for signed URLs
function AttachmentLink({ path }: { path: string }) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUrl() {
      const { data, error } = await supabase.storage
        .from("attachments")
        .createSignedUrl(path, 60 * 60);
      if (!error) setSignedUrl(data.signedUrl);
    }
    fetchUrl();
  }, [path]);

  if (!signedUrl) return <span className="text-gray-400">Loading...</span>;

  return (
    <a
      href={signedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:underline"
    >
      <File className="h-4 w-4" />
      {path.split("/").pop()}
    </a>
  );
}
