import axios from "axios";
import { useState, useEffect } from "react";
function CollectionList(props) {
  const [status, setStatus] = useState<boolean>();
  const [strapiID, setStrapiID] = useState(null);
  useEffect(() => {
    chceckGameInCollection();
  }, []);
  const chceckGameInCollection = () => {
    for (const coll of props.collection.games) {
      if (props.id == coll.gameID) {
        setStatus(true);
        return 0;
      }
    }
    setStatus(false);
  };
  const changeCollection = (collection) => {
    let count = 0;
    axios
      .get("http://localhost:1337/api/games?populate=*")
      .then((response) => {
        // sprawdzenie czy gra jest w strapim

        for (const game of response.data.data) {
          if (game.attributes.gameID == props.id) {
            count++;
            setStrapiID(game.id);
          }
        }
        if (count === 0) {
          const data = { gameID: String(props.id) };
          axios
            .post("http://localhost:1337/api/games", { data })
            .then((response) => {
              //dodanie gry do strapiego jesli jej nie ma
              setStrapiID(response.data.data.id);
            })
            .catch((err) => console.log(err));
        }
        count = 0;
        const newCollection = [];
        for (const game of collection.games) {
          if (game.gameID == props.id) {
            count++;
          }
        }
        if (count > 0) {
          console.log("gra jest w kolekcji");
          for (const game of collection.games) {
            if (game.gameID != props.id) {
              newCollection.push(game);
            }
          }
        } else {
          console.log("gry nie ma w kolekcji");
          for (const game of collection.games) {
            newCollection.push(game);
          }
          newCollection.push({ gameID: String(props.id), id: strapiID });
        }
        axios
          .put(`http://localhost:1337/api/collections/${collection.id}?populate=*`, {
            data: { games: newCollection },
          })
          .then((response) => {
            console.log("kolekcja zostala zmieniona");
            status === true ? setStatus(false) : setStatus(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="box">
        <div className="collectionpopup-name">{props.name} </div>
        <div className="collectionpopup-symbols">
          {!status ? (
            <div
              className="collectionpopup-symbol collectionpopup-symbol-add"
              onClick={() => changeCollection(props.collection)}>
              Add
            </div>
          ) : (
            <div
              className="collectionpopup-symbol collectionpopup-symbol-delete"
              onClick={() => changeCollection(props.collection)}>
              Delete
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default CollectionList;
