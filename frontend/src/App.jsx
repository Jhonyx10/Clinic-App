import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import AuthNavigation from "./components/navigation/AuthNavigation";


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthNavigation/>
    </QueryClientProvider>
  )
}

export default App;
