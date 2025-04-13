
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Copy, EyeOff, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ApiKeyForm() {
  const [apiKey, setApiKey] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key before saving.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd save this securely
    localStorage.setItem("vuln_vision_api_key", apiKey);
    setIsSaved(true);
    
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved successfully.",
      variant: "default",
    });
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    
    toast({
      title: "Copied to Clipboard",
      description: "API key has been copied to clipboard.",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" />
          API Configuration
        </CardTitle>
        <CardDescription>
          Enter your LLM API key to enable vulnerability scanning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={isHidden ? "password" : "text"}
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false);
                }}
                className="pr-20"
              />
              <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-3">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="h-7 w-7"
                  onClick={toggleVisibility}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="h-7 w-7"
                  onClick={handleCopyKey}
                  disabled={!apiKey}
                >
                  {isCopied ? (
                    <CheckCircle className="h-4 w-4 text-low" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button onClick={handleSaveKey} disabled={isSaved}>
          {isSaved ? "Saved" : "Save API Key"}
        </Button>
      </CardFooter>
    </Card>
  );
}
