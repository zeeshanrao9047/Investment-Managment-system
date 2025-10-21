import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectDetailsPage from "@/pages/ProjectDetailsPage";
import SettingsPage from "@/pages/SettingsPage";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Dashboard from "./pages/dashboard/Dashboard";
import ContextProvider from "./context/Contextprovider";
import Contactus from './pages/Contactus'
import Contactsdetail from "./pages/Contactsdetail";
import Projects from "./pages/Projects";
import Projectdetail from "./pages/Projectdetail";
import Communications from "./pages/Communications";
import Newportalupdate from "./pages/Newportalupdate";
import CapitalRaises from "./pages/CapitalRaises";
import Reports from "./pages/Reports";
import Tasks from "./pages/Tasks";
import Accounts from "./pages/Accounts";
import CapitalRaisesStep2 from "@/components/capital-Raises/CapitalRaisesStep2";
import CapitalRaisesStep3 from "@/components/capital-Raises/CapitalRaisesStep3";
import CapitalRaisesStep4 from "@/components/capital-Raises/CapitalRaisesStep4";
import CapitalRaisesStep5 from "@/components/capital-Raises/CapitalRaisesStep5";
import CapitalRaisesStep6 from "@/components/capital-Raises/CapitalRaisesStep6";
import CapitalRaisesStep7 from "@/components/capital-Raises/CapitalRaisesStep7";
function Router() {
  return (
    <ContextProvider>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/dashboard" component={() => <Dashboard />} />
        <ProtectedRoute
          path="/projects/:id"
          component={() => <ProjectDetailsPage />}
        />
        <ProtectedRoute path="/settings" component={() => <SettingsPage />} />
        <ProtectedRoute path="/contact" component={() => <Contactus />} />
        <ProtectedRoute path="/contactsdetail" component={() => <Contactsdetail/>} />
        <ProtectedRoute path="/projects" component={() => <Projects/>} />
        <ProtectedRoute path="/projectdetail" component={() => <Projectdetail/>} />
        <ProtectedRoute path="/communications" component={() => <Communications/>} />
        <ProtectedRoute path="/newportalupdate" component={() => <Newportalupdate/>} />
        <ProtectedRoute path="/capitalraises" component={() => <CapitalRaises/>} />
 
        <Route path="/capitalraises/step2" component={() => <CapitalRaisesStep2 />} />
        <Route path="/capitalraises/step3" component={() => <CapitalRaisesStep3 />} />
        <Route path="/capitalraises/step4" component={() => <CapitalRaisesStep4 />} />
        <Route path="/capitalraises/step5" component={() => <CapitalRaisesStep5 />} />
        <Route path="/capitalraises/step6" component={() => <CapitalRaisesStep6 />} />
        <Route path="/capitalraises/step7" component={() => <CapitalRaisesStep7 />} />


        <ProtectedRoute path="/reports" component={() => <Reports/>} />
        <ProtectedRoute path="/tasks" component={() => <Tasks/>} />
        <ProtectedRoute path="/accounts" component={() => <Accounts/>} />
        <Route component={NotFound} />
      </Switch>
    </ContextProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
