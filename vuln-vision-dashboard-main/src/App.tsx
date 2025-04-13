
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Vulnerabilities from "./pages/Vulnerabilities";
import Security from "./pages/Security";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";

// Placeholder component for routes we haven't fully implemented yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <AppLayout>
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-6">This page is currently under development.</p>
    </div>
  </AppLayout>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/security" element={<Security />} />
          <Route path="/dependencies" element={<PlaceholderPage title="Dependencies" />} />
          <Route path="/explore" element={<PlaceholderPage title="Explore" />} />
          <Route path="/history" element={<PlaceholderPage title="History" />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
