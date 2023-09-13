import "../pages/userProfile/userProfile.css";
import { useNavigate } from "react-router-dom";
function CategoryCard(props: { [key: string | number]: string | number }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/collection/${props.owner}/${props.userID}/${props.slug}`);
  };
  return (
    <div className="categoryCard" onClick={() => handleClick(props.title)}>
      <div className="categoryCard--icon">
        <img src={`../../src/images/${props.src}`}></img>
      </div>
      <div className="categoryCard--content">
        <div className="categoryCard--title">{props.title}</div>
        <div className="categoryCard--number">{props.value}</div>
      </div>
    </div>
  );
}
export default CategoryCard;
