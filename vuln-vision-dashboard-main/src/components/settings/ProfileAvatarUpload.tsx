
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileAvatarUploadProps {
  initialImage?: string;
  onImageChange?: (image: string) => void;
}

export function ProfileAvatarUpload({ 
  initialImage = "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex", 
  onImageChange 
}: ProfileAvatarUploadProps) {
  const [avatarSrc, setAvatarSrc] = useState<string>(initialImage);
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 1MB",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setAvatarSrc(objectUrl);
    
    if (onImageChange) {
      onImageChange(objectUrl);
    }

    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully."
    });
  };

  const handleRemoveAvatar = () => {
    setAvatarSrc(initialImage);
    if (onImageChange) {
      onImageChange(initialImage);
    }
    toast({
      title: "Avatar removed",
      description: "Your profile picture has been reset to default."
    });
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div 
        className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={avatarSrc} alt="Profile" className="object-cover" />
          <AvatarFallback>
            <User className="h-12 w-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        
        {isHovering && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <Upload className="h-4 w-4" />
              </div>
            </label>
            {avatarSrc !== initialImage && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-white"
                onClick={handleRemoveAvatar}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <p className="text-sm text-muted-foreground">
        Click on the avatar to change your profile picture
      </p>
      <p className="text-xs text-muted-foreground">
        JPG or PNG. 1MB max.
      </p>
    </div>
  );
}
