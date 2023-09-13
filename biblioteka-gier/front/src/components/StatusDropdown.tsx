import axios from "axios";
import { useState, useEffect } from "react";
function StatusDropdown({ id }) {
  const [status, setStatus] = useState<String | null>();
  const changeStatus = (stat: String | null) => {
    let strapiID;
    const currentUserData = JSON.parse(sessionStorage.getItem("me"));
    axios.get(`http://localhost:1337/api/games`).then((result) => {
      let found = false;
      result.data.data.forEach((element) => {
        if (element.attributes && element.attributes.gameID == id) {
          strapiID = element.id;
          found = true;
        }
      });

      if (!found) {
        const data = { gameID: String(id) };
        axios.post("http://localhost:1337/api/games", { data }).then((response) => {
          strapiID = response.data.data.id;
          console.log(result);
        });
      }
      axios.get("http://localhost:1337/api/users/me?populate=*").then((response) => {
        let count = 0;
        for (const game of response.data[stat]) {
          if (game.gameID == id) {
            count++;
          }
        }
        if (count > 0) {
          // gra ma status ten sam co klikniety, wiec trzeba go usunac
          axios.get("http://localhost:1337/api/users/me?populate=*").then((response) => {
            const newList = [];
            for (const game of response.data[stat]) {
              if (game.gameID != id) newList.push(game);
            }
            const data = { [stat]: newList };
            axios
              .put(`http://localhost:1337/api/users/${currentUserData.id}`, data)
              .then((response) => {
                setStatus(null);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        } else {
          // gra ma inny status niz ten co klikniety (lub go nie ma wcale)
          axios.get("http://localhost:1337/api/users/me?populate=*").then((response) => {
            const newList = [];
            const newList2 = [];
            if (status) {
              for (const game of response.data[status]) {
                if (game.gameID != id) newList.push(game);
              }
            }

            for (const game of response.data[stat]) {
              newList2.push(game);
            }
            newList2.push({ gameID: id, id: strapiID });
            const data = { [status]: newList, [stat]: newList2 };
            axios
              .put(`http://localhost:1337/api/users/${currentUserData.id}`, data)
              .then((response) => {
                setStatus(stat);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      });
    });
  };

  const checkStatus = () => {
    sessionStorage.getItem("completed")?.includes(`"${id}"`) ? setStatus("completed") : null;
    sessionStorage.getItem("inPlans")?.includes(`"${id}"`) ? setStatus("inPlans") : null;
    sessionStorage.getItem("abandoned")?.includes(`"${id}"`) ? setStatus("abandoned") : null;
    sessionStorage.getItem("playing")?.includes(`"${id}"`) ? setStatus("playing") : null;
  };
  useEffect(() => {
    checkStatus();
  }, []);

  const statusColor =
    status === "completed"
      ? "#6a994e"
      : status === "abandoned"
      ? "#bc4749"
      : status === "inPlans"
      ? "#1982c4"
      : status === "playing"
      ? "#c09c3b"
      : "#454545";
  return (
    <div className="gameCard__addToCollections-dropdown">
      <div className="gameCard__addToCollections-button" style={{ backgroundColor: statusColor }}>
        {status ? <>{status}</> : <>Change a status</>}
        <div className="gameCard__addToCollections-dropdownButton">▼</div>
      </div>
      <div className="gameCard__addToCollections-content">
        <div
          onClick={() => {
            changeStatus("completed");
          }}>
          Completed
        </div>
        <div
          onClick={() => {
            changeStatus("inPlans");
          }}>
          In plans
        </div>
        <div
          onClick={() => {
            changeStatus("playing");
          }}>
          Playing
        </div>
        <div
          onClick={() => {
            changeStatus("abandoned");
          }}>
          Abandoned
        </div>
      </div>
    </div>
  );
}
export default StatusDropdown;
