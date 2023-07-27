import CategoryCard from "../../components/CategoryCard";
import LibraryCard from "../../components/LibraryCard";
import ProfileHeader from "../../components/ProfileHeader";
import profileButtons from "../../components/profilesButton";

function UserProfile() {
	const customLibraries = [
		{
			id: 1,
			title: "best RPG GAMES ever!!!!",
			src: "witcher3.jpg",
			value: 3,
			backgroudSRC: "Witcher 3",
		},
		{
			id: 2,
			title: "love-hate relationship",
			src: "fnaf.jpg",
			value: 12,
			backgroudSRC: "Five Nights At Freddys",
		},
		{
			id: 3,
			title: "i gave that list of games very long name to test how it looks like",
			src: "unpacking.jpg",
			value: 62,
			backgroudSRC: "unpacking",
		},
	];
	return (
		<div className="userProfile">
			<ProfileHeader src="spiderman.jpg" avatarSRC="tom.jpg" />
			<p className="userProfile--summary">Summary</p>
			<div className="profileButtonsBar">
				{profileButtons.map(item => (
					<CategoryCard
						key={item.id}
						src={item.src}
						title={item.title}
						value={item.value}
					/>
				))}
			</div>
			<p className="userProfile--libraries">Libraries</p>
			<div className="librariesButtonsBar">
				{customLibraries.map(item => (
					<LibraryCard
						key={item.id}
						src={item.src}
						title={item.title}
						value={item.value}
						backgroudSRC={item.backgroudSRC}
					/>
				))}
			</div>
		</div>
	);
}
export default UserProfile;
