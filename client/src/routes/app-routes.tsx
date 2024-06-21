import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Lobby } from "../module/lobby/Lobby";
import { MainView } from "../module/main-view/MainView";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        // TODO:
        <Route path="/:id" element={<MainView />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
