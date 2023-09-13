import { NavLink, useNavigate } from "react-router-dom";
import "../pages/home/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./collectionsPopup.css";
import CollectionList from "./CollectionList";
import StatusDropdown from "./StatusDropdown";
interface gameCardProps {
  id: any;
  image: string;
  rating: number;
  title: string;
  platforms: string;
  developers: string;
}
const GameCard: React.FC<gameCardProps> = ({ id, image, rating, title, platforms, developers }) => {
  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);
  const [strapiID, setStrapiID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCollection, setCreateCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const handleClick = (id: number) => {
    navigate(`/game/${id}`);
  };
  const newRating = rating || "?";
  const ratingColor =
    newRating == "?" ? "#974EC3" : newRating <= 49 ? "#f00" : newRating <= 74 ? "#fc3" : "#6c3";
  const createNamedCollection = (name) => {
    const userID = JSON.parse(sessionStorage.getItem("me")).id;
    axios
      .post("http://localhost:1337/api/collections", { data: { name: name, user: userID } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewCollection = () => {
    setCreateCollection(true);
  };

  useEffect(() => {
    setCollections(JSON.parse(sessionStorage.getItem("collections")));
  }, []);

  const handleChange = (event) => {
    setCollectionName(event.target.value);
  };
  if (!isModalOpen) {
    return (
      <div key={id} className="gameCard">
        <div className="gameCard-clickable" onClick={() => handleClick(id)}>
          <div className="gameCard__image">
            <img src={image} />
          </div>
          <div className="gameCard__rating" style={{ backgroundColor: ratingColor }}>
            {rating || "?"}
          </div>
          <div className="gameCard__title">{title}</div>
          <div className="gameCard__platforms">{developers}</div>
        </div>
        <div className="gameCard__addToCollections">
          <StatusDropdown id={id} />
          <div className="gameCard__addToCollections-dropdown">
            <div
              className="gameCard__addToCollections-button"
              onClick={() => {
                setIsModalOpen(true);
              }}>
              Add to collections
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div key={id} className="gameCard">
        <div className="collectionpopup">
          <div className="fullWidth-top">
            <div className="collectionpopup-title">
              Manage <b>{title}</b> in your collections:
            </div>
          </div>

          <div className="collectionpopup-content">
            {createCollection ? (
              <div className="box">
                <div className="collectionpopup-name">
                  <input
                    type="text"
                    className="newCollection"
                    placeholder="name your collection"
                    value={collectionName}
                    onChange={handleChange} // Attach the handleChange function here
                  />
                </div>
                <div
                  className="collectionpopup-symbol collectionpopup-symbol-add"
                  onClick={() => createNamedCollection(collectionName)}>
                  Create
                </div>
              </div>
            ) : null}
            {collections.map((item) => (
              <div key={item.id}>
                <CollectionList name={item.name} key={item.id} id={id} collection={item} />
              </div>
            ))}
          </div>
          <div className="fullWidth-bottom">
            <div className="collectionpopup-close" onClick={() => createNewCollection()}>
              Create new collection
            </div>
            <div className="collectionpopup-close" onClick={() => setIsModalOpen(false)}>
              Close
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
