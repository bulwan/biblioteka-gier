import { useEffect, useState } from "react";
import "../Components/Sidebar.css";
import { useParams, useNavigate, NavLink } from "react-router-dom";
const Sidebar = ({
  updateValues,
}: {
  updateValues: (fetchValue: string, titleValue: string) => void;
}) => {
  const navigate = useNavigate();
  const [blockedButton, setBlockedButton] = useState<string | null>(null);
  const [showPlatform, setShowPlatform] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, buttonName: string) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    const className = event.currentTarget.className;
    if (blockedButton === buttonName) {
      setBlockedButton(null);
    } else {
      setBlockedButton(buttonName);
    }
    function formatDate(date = new Date()) {
      const year = date.toLocaleString("default", { year: "numeric" });
      const month = date.toLocaleString("default", { month: "2-digit" });
      const day = date.toLocaleString("default", { day: "2-digit" });
      return [year, month, day].join("-");
    }
    let today = new Date();
    let today2 = new Date();
    today2.setDate(today.getDate());
    let priorDate = new Date();
    let comingSoonDate = new Date();
    priorDate.setDate(today.getDate() - 30);
    comingSoonDate.setDate(today.getDate() + 60);
    const formattedPriorDate = formatDate(priorDate);
    const formattedSoonDate = formatDate(comingSoonDate);

    const sidebarData = [
      { className: "sidebar__allGames", query: "page_size=25", label: "All Games" },
      {
        className: "sidebar__bestOfAllTime",
        query: "page_size=25&metacritic=85,100",
        label: "Best of All Time",
      },
      {
        className: "sidebar__popular2023",
        query: "page_size=25&dates=2023-01-01,2023-12-31",
        label: "Popular in 2023",
      },
      {
        className: "sidebar__last30Days",
        query: `page_size=25&dates=${formattedPriorDate},${formatDate()}`,
        label: "Last 30 days",
      },
      {
        className: "sidebar__comingSoon",
        query: `page_size=25&dates=${formatDate()},${formattedSoonDate}`,
        label: "Coming soon",
      },
      { className: "sidebar__windows", query: `page_size=25&platforms=4`, label: "Games for PC" },
      {
        className: "sidebar__playstation5",
        query: `page_size=25&platforms=187`,
        label: "Games for Playstation 5",
      },
      {
        className: "sidebar__xboxSeries",
        query: `page_size=25&platforms=186`,
        label: "Games for Xbox Series S/X",
      },
      {
        className: "sidebar__xboxOne",
        query: `page_size=25&platforms=1`,
        label: "Games for Xbox One",
      },
      {
        className: "sidebar__xbox360",
        query: `page_size=25&platforms=14`,
        label: "Games for Xbox 360",
      },
      { className: "sidebar__xbox", query: `page_size=25&platforms=80`, label: "Games for Xbox" },
      {
        className: "sidebar__playstation4",
        query: `page_size=25&platforms=18`,
        label: "Games for Playstation 4",
      },
      {
        className: "sidebar__playstation3",
        query: `page_size=25&platforms=16`,
        label: "Games for Playstation 3",
      },
      {
        className: "sidebar__playstation2",
        query: `page_size=25&platforms=15`,
        label: "Games for Playstation 2",
      },
      {
        className: "sidebar__playstation",
        query: `page_size=25&platforms=27`,
        label: "Games for Playstation 1",
      },
      { className: "sidebar__rpg", query: `page_size=25&genres=5`, label: "Genre: RPG" },
      { className: "sidebar__fps", query: `page_size=25&genres=2`, label: "Genre: FPS" },
      {
        className: "sidebar__adventure",
        query: `page_size=25&genres=3`,
        label: "Genre: Adventure",
      },
      { className: "sidebar__action", query: `page_size=25&genres=4`, label: "Genre: Action" },
      { className: "sidebar__strategy", query: `page_size=25&genres=10`, label: "Genre: Strategy" },
      { className: "sidebar__indie", query: `page_size=25&genres=51`, label: "Genre: Indie" },
      { className: "sidebar__puzzle", query: `page_size=25&genres=7`, label: "Genre: Puzzle" },
      { className: "sidebar__racing", query: `page_size=25&genres=1`, label: "Genre: Racing" },
      { className: "sidebar__sports", query: `page_size=25&genres=15`, label: "Genre: Sports" },
    ];
    event.preventDefault();

    const data = sidebarData.find((item) => className.includes(item.className));
    navigate("/");
    if (data) {
      navigate("/");
      updateValues(data.query, data.label);
    }
  };
  const createButton = (
    label: string,
    className: string,
    eventName: string,
    disabledCondition: boolean
  ) => (
    <button
      className={`${className} ${blockedButton === eventName ? "blocked" : ""}`}
      onClick={(event) => handleClick(event, eventName)}
      disabled={disabledCondition}>
      {label}
    </button>
  );

  return (
    <div className="sidebar">
      <NavLink to="/ranking">
        <h3 className="sidebar_rankings">Show users rankings</h3>
      </NavLink>
      {createButton("All games", "sidebar__allGames", "allGames", blockedButton === "allGames")}
      <p className="sidebar__titles">Top games</p>
      {createButton(
        "Best of all time",
        "sidebar__bestOfAllTime",
        "bestOfAllTime",
        blockedButton === "bestOfAllTime"
      )}
      {createButton(
        "Popular in 2023",
        "sidebar__popular2023",
        "popular2023",
        blockedButton === "popular2023"
      )}
      <p className="sidebar__titles">New Releases</p>
      {createButton(
        "Last 30 days",
        "sidebar__last30Days",
        "last30Days",
        blockedButton === "last30Days"
      )}
      {createButton(
        "Coming soon",
        "sidebar__comingSoon",
        "comingSoon",
        blockedButton === "comingSoon"
      )}
      <p className="sidebar__titles">Platforms</p>
      {createButton("PC", "sidebar__windows", "windows", blockedButton === "windows")}
      {createButton(
        "Playstation 5",
        "sidebar__playstation5",
        "playstation5",
        blockedButton === "playstation5"
      )}
      {createButton(
        "Xbox Series S/X",
        "sidebar__xboxSeries",
        "xboxSeries",
        blockedButton === "xboxSeries"
      )}
      {showPlatform && (
        <>
          {createButton("Xbox One", "sidebar__xboxOne", "xboxOne", blockedButton === "xboxOne")}
          {createButton(
            "Playstation 4",
            "sidebar__playstation4",
            "playstation4",
            blockedButton === "playstation4"
          )}
          {createButton("", "sidebar__xbox360", "xbox360", blockedButton === "xbox360")}
          {createButton(
            "Playstation 3",
            "sidebar__playstation3",
            "playstation3",
            blockedButton === "playstation3"
          )}
          {createButton("Xbox", "sidebar__xbox", "xbox", blockedButton === "xbox")}
          {createButton(
            "Playstation 2",
            "sidebar__playstation2",
            "playstation2",
            blockedButton === "playstation2"
          )}
          {createButton(
            "Playstation 1",
            "sidebar__playstation",
            "playstation",
            blockedButton === "playstation"
          )}
        </>
      )}
      <button className="sidebar__showAllPlatforms" onClick={() => setShowPlatform(!showPlatform)}>
        {showPlatform ? "Show less platforms" : "Show more platforms"}
      </button>
      <p className="sidebar__titles">Genres</p>
      {createButton("RPG", "sidebar__rpg", "rpg", blockedButton === "rpg")}
      {createButton("FPS", "sidebar__fps", "fps", blockedButton === "fps")}
      {createButton("Adventure", "sidebar__adventure", "adventure", blockedButton === "adventure")}
      {showGenres && (
        <>
          {createButton("Action", "sidebar__action", "action", blockedButton === "action")}
          {createButton("Strategy", "sidebar__strategy", "strategy", blockedButton === "strategy")}
          {createButton("Indie", "sidebar__indie", "indie", blockedButton === "indie")}
          {createButton("Puzzle", "sidebar__puzzle", "puzzle", blockedButton === "puzzle")}
          {createButton("Racing", "sidebar__racing", "racing", blockedButton === "racing")}
          {createButton("Sports", "sidebar__sports", "sports", blockedButton === "sports")}
        </>
      )}
      <button className="sidebar__showAllGenres" onClick={() => setShowGenres(!showGenres)}>
        {showGenres ? "Show less genres" : "Show more genres"}
      </button>
    </div>
  );
};

export default Sidebar;
