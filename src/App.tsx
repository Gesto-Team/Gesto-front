import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import { ThemeProvider } from "./components/ui/DarkMode/theme-provider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Products } from "./components/ProductsList/Products";
import { SettingPage } from "./components/Setting/SettingPage";
import { DashboardPage } from "./components/DashboardPage/DashboardPage";
import { Navbar } from "./components/Navbar/Navbar";

// const fetchData = async () => {
//   const accessToken = localStorage.getItem("accessToken") || "";
//   const userID = jwtDecode(accessToken).sub;
//   console.log(jwtDecode(accessToken));
//   // const userID = localStorage.getItem("userID");
//   try {
//     const response = await axiosApiInstance.get(`users/${userID}`);
//     console.log("Données récupérées:", response.data);
//     const response2 = await axiosApiInstance.get(`auth/refresh`);
//     console.log(response);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données:", error);
//   }
// };

// fetchData();

const isAuthenticated = (): boolean => {
  // Vérifie si l'utilisateur est authentifié, par exemple en vérifiant la présence d'un jeton d'accès dans le localStorage
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
};

// const Navbar: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Accueil</Link>
//         </li>
//         <li>
//           {isAuthenticated() ? (
//             <button onClick={handleLogout}>Se déconnecter</button>
//           ) : (
//             <Link to="/login">Connexion</Link>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// const handleLogout = () => {
//   localStorage.removeItem("userID");
//   localStorage.removeItem("accessToken");
//   window.location.href = "/login";
// };

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <div>
            {/* <Navbar
            isLoggedIn={isAuthenticated() ? true : false}
            onLogout={handleLogout}
          /> */}
            <Navbar />
            <Routes>
              {/* <Route
                path="/"
                element={
                  isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />
                }
              /> */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/setting" element={<SettingPage />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
