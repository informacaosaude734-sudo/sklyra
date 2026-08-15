import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { LanguageProvider } from "./i18n";

// Lazy-load every non-landing route so the initial bundle stays lean
const NotFound = lazy(() => import("./pages/NotFound"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightPost = lazy(() => import("./pages/InsightPost"));
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const DemoSite = lazy(() => import("./pages/DemoSite"));
const CookieBanner = lazy(() => import("./components/CookieBanner"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicos" element={<Index />} />
              <Route path="/metodo" element={<Index />} />
              <Route path="/precos" element={<Index />} />
              <Route path="/faq" element={<Index />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:id" element={<InsightPost />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:slug" element={<CaseDetail />} />
              <Route path="/demo/:slug" element={<DemoSite />} />
              <Route path="/demo/:slug/:page" element={<DemoSite />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
