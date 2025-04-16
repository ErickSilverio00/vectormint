import { TooltipProvider } from "@/components/ui/tooltip";
import FinalRoutes from "@/routes/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import HoldingImage from "./components/holding-image";
import Providers from "./hooks/providers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-right" richColors />
      <Providers>
        <FinalRoutes />
        <HoldingImage />
      </Providers>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
