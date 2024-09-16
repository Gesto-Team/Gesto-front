import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Home, LineChart, LogOut, Package, Package2 } from "lucide-react";
import { ModeToggle } from "../ui/DarkMode/ModeToggle";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/router/hooks/useAuth";

export function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
      : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <a
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Gesto</span>
          </a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/products" className={getLinkClass("/products")}>
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Produits</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Produits</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/charts" className={getLinkClass("/charts")}>
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Statistiques</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Statistiques</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {/* {user && user.role === "admin" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/setting" className={getLinkClass("/setting")}>
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Paramétres</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Paramétres</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <></>
          )} */}
          <ModeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild onClick={logout}>
                <Link to="/login" className={getLinkClass("/login")}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Déconnexion</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Déconnexion</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <Outlet />
    </>
  );
}
