import { Link } from "react-router-dom";

import { useState } from "react";
import { SettingGeneral } from "./SettingGeneral";
import { SettingSecurite } from "./SettingSecurite";
import { SettingTeam } from "./SettingTeam";

export function SettingPage() {
  const [activeSection, setActiveSection] = useState("General");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Paramètres</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              {/* <Link
                to="#"
                onClick={() => setActiveSection("General")}
                className={`${activeSection === "General" ? "font-semibold text-primary" : ""}`}
              >
                Général
              </Link> */}
              {/* <Link
                to="#"
                onClick={() => setActiveSection("securite")}
                className={`${
                  activeSection === "securite"
                    ? "font-semibold text-primary"
                    : ""
                }`}
              >
                Sécurité
              </Link> */}
              <Link
                to="#"
                onClick={() => setActiveSection("team")}
                className={`${
                  activeSection === "team" ? "font-semibold text-primary" : ""
                }`}
              >
                Gestion d'équipe
              </Link>
            </nav>
            {activeSection === "General" && <SettingGeneral />}
            {activeSection === "securite" && <SettingSecurite />}
            {activeSection === "team" && <SettingTeam />}
          </div>
        </main>
      </div>
    </div>
  );
}
