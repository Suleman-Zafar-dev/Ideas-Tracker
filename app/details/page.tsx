"use client";
import { useState } from "react";

export default function DetailsPage() {
  const [links, setLinks] = useState<string[]>([""]);
  const [nextActions, setNextActions] = useState<string[]>([""]);

  // --- Links ---
  const handleAddLink = () => setLinks([...links, ""]);
  const handleLinkChange = (index: number, value: string) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };
  const handleRemoveLink = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated.length > 0 ? updated : [""]);
  };

  // --- Next Actions ---
  const handleAddAction = () => setNextActions([...nextActions, ""]);
  const handleActionChange = (index: number, value: string) => {
    const updated = [...nextActions];
    updated[index] = value;
    setNextActions(updated);
  };
  const handleRemoveAction = (index: number) => {
    const updated = nextActions.filter((_, i) => i !== index);
    setNextActions(updated.length > 0 ? updated : [""]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col px-4 py-8">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">Idea Details</h1>
        <p className="mb-8">
          Edit and refine your idea. Your progress is saved automatically.
        </p>

        {/* Idea Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Idea Title</label>
          <input
            type="text"
            placeholder="Enter your idea title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Add description..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            rows={3}
            placeholder="Add your notes, thoughts, and brainstorming ideas here..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Links */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Links</label>
          {links.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                placeholder="https://example.com"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring"
              />
              <button
                type="button"
                onClick={() => handleRemoveLink(index)}
                className="ml-2 px-2"
                aria-label="Remove link"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLink}
            className="text-sm underline"
          >
            + Add another link
          </button>
        </div>

        {/* Attachments */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Attachments</label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer">
            <span className="text-2xl">＋</span>
            <p className="text-sm mt-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs mt-1">Maximum file size: 10MB</p>
          </div>
        </div>

        {/* Next Actions */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Next Actions</label>
          <div className="space-y-2">
            {nextActions.map((action, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <input
                  type="text"
                  value={action}
                  onChange={(e) => handleActionChange(index, e.target.value)}
                  placeholder="Enter next action..."
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAction(index)}
                  className="px-2"
                  aria-label="Remove action"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddAction}
            className="mt-2 text-sm underline"
          >
            + Add a next action
          </button>
        </div>

        {/* Save Changes */}
        <div className="mt-auto">
          <button className="w-full py-3 rounded-lg font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
