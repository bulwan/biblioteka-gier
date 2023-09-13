import axios from "axios";
import { useEffect, useState } from "react";
import "./ranking.css";
import { NavLink } from "react-router-dom";
import RankingTable from "./RankingTable";

function Ranking() {
  return (
    <div className="ranking">
      <h1>Top users.</h1>
      <RankingTable type="completed" />
      <RankingTable type="inPlans" />
      <RankingTable type="abandoned" />
      <RankingTable type="playing" />
    </div>
  );
}
export default Ranking;
