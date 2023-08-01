import "../Components/Sidebar.scss";
const Sidebar = () => {
  return (
    <div className="sidebar">
    <button className="sidebar__allGames">All games</button>
    <p className="sidebar__titles">Top games</p>
    <button className="sidebar__bestOfAllTime">Best of all time</button>
    <button className="sidebar__popular2023">Popular in 2023</button>
    <p className="sidebar__titles">New <br/> Releases</p>
    <button className="sidebar__last30Days">Last 30 days</button>
    <button className="sidebar__comingSoon">Coming soon</button>
    <p className="sidebar__titles">Platforms</p>
    <button className="sidebar__windows">Windows</button>
    <button className="sidebar__playstation">Playstation</button>
    <button className="sidebar__xbox">Xbox</button>
    <button className="sidebar__showAllPlatforms">Show all platforms</button>
    <p className="sidebar__titles">Genres</p>
    <button className="sidebar__rpg">RPG</button>
    <button className="sidebar__fps">FPS</button>
    <button className="sidebar__adventure">Adventure</button>
    <button className="sidebar__showAllGenres">Show all genres</button>
    </div>
  );
};
export default Sidebar;
