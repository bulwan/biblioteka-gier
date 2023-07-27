import "../pages/userProfile/userProfile.css";
function CategoryCard(props: { [key: string | number]: string | number }) {
	const imagePath = `./src/images/${props.src}`;
	return (
		<div className="categoryCard">
			<div className="categoryCard--icon">
				<img src={imagePath}></img>
			</div>
			<div className="categoryCard--content">
				<div className="categoryCard--title">{props.title}</div>
				<div className="categoryCard--number">{props.value}</div>
			</div>
		</div>
	);
}
export default CategoryCard;
