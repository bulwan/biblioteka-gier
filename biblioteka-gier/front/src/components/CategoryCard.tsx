import "../pages/userProfile/userProfile.css";
function CategoryCard(props: { [key: string | number]: string | number }) {
	return (
		<div className="categoryCard">
			<div className="categoryCard--icon">
				<img src={`./src/images/${props.src}`}></img>
			</div>
			<div className="categoryCard--content">
				<div className="categoryCard--title">{props.title}</div>
				<div className="categoryCard--number">{props.value}</div>
			</div>
		</div>
	);
}
export default CategoryCard;
