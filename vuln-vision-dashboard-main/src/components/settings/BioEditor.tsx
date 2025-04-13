
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Edit } from "lucide-react";

interface BioEditorProps {
  initialBio: string;
  maxLength?: number;
  onSave?: (bio: string) => void;
}

export function BioEditor({ 
  initialBio, 
  maxLength = 160,
  onSave 
}: BioEditorProps) {
  const [bio, setBio] = useState(initialBio);
  const [isEditing, setIsEditing] = useState(false);
  const [previousBio, setPreviousBio] = useState(initialBio);
  const { toast } = useToast();

  const handleEdit = () => {
    setPreviousBio(bio);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setBio(previousBio);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    
    if (onSave) {
      onSave(bio);
    }
    
    toast({
      title: "Bio updated",
      description: "Your profile bio has been updated successfully."
    });
  };

  return (
    <div className="space-y-2">
      {isEditing ? (
        <>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={maxLength}
            className="min-h-[120px]"
            placeholder="Tell us about yourself"
          />
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {bio.length}/{maxLength} characters
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <div className="rounded-md border p-3 min-h-[120px]">
            {bio || "No bio yet. Click edit to add one."}
          </div>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Bio
          </Button>
        </div>
      )}
    </div>
  );
}
