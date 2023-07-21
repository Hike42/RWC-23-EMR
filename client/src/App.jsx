import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import Registration from "./screens/Registration/Registration";
import { AuthProvider } from "./contexts/auth/auth";
import Home from "./screens/Home/Home";
import { Router } from "@reach/router";
import Header from "./Components/Header/Header";
import DashboardExample from "./Components/Dashboard/Dashboard";
import ChatPage from "./Components/Chat/Chat";
import Demandes from "./Components/Demandes/Demandes";
import AccreditationsPage from "./Components/Accreditations/Accreditations";
import Rapports from "./Components/Rapports/Rapports";
import ProfilePage from "./Components/Profil/Profil";
import StatisticsPage from "./Components/Statistics/Statistics";
import AccessRequestPage from "./Components/Demandes/AccessRequestPage";
import DeliveryProcess from "./Components/Accreditations/DeliveryProcess";

function App() {
  const [fetchAPI, loading] = useFetch();

  useEffect(() => {
    // exemple API GET
    // const getData = async () => {
    //   const response = await fetchAPI({ url: 'https://localhost:8000/api/media', method: 'GET' });
    //   const data = await response.json();
    //   console.log(data);
    // }
    // exemple API POST | PUT
    // const setData = async () => {
    //   const credentials = {
    //     name: 'test',
    //     description: 'test'
    //   }
    //   const response = await fetchAPI({ url: 'https://localhost:8000/api/media', method: 'POST', body: JSON.stringify(credentials)})
    //   console.log(response);
    // }
    // getData();
    // setData();
  });

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Router>
          <DashboardExample path="/" />
          <ChatPage path="/chat" />
          <Demandes path="/demandes" />
          <AccreditationsPage path="/accreditations" />
          <Rapports path="/rapports" />
          <ProfilePage path="/profil" />
          <StatisticsPage path="/statistiques" />
          <AccessRequestPage path="/demandes/:id" />
          <DeliveryProcess path="/accreditations/:id" />
          <Home path="/home" />
          <Login path="/login" />
          <Registration path="/registration" />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
