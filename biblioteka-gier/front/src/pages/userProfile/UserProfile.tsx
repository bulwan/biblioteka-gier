import CategoryCard from "../../components/CategoryCard";
import CollectionCard from "../../components/CollectionCard";
import ProfileHeader from "../../components/ProfileHeader";
import { useState, useEffect } from "react";
import "./userProfile.css";
import axios from "axios";
function UserProfile() {
	const url = "http://localhost:1337";
	const [profilePicture, setProfilePicture] = useState("");
	const [backgroundPicture, setBackgroundPicture] = useState("");
	const [username, setUsername] = useState("");
	const [collections, setCollections] = useState(null);
	const [completed, setCompleted] = useState([]);
	const [inPlans, setInPlans] = useState([]);
	const [abandoned, setAbandoned] = useState([]);
	const [playing, setPlaying] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:1337/api/users/me?populate=*")
			.then(response => {
				response.data.profilePicture === null
					? setProfilePicture(
							"../../src/images/defaultProfilePicture.jpg"
					  )
					: setProfilePicture(url + response.data.profilePicture.url);
				response.data.backgroundPicture === null
					? setBackgroundPicture(
							"../../src/images/defaultBackgroundPicture.jpg"
					  )
					: setBackgroundPicture(
							url + response.data.backgroundPicture.url
					  );
				setUsername(response.data.username);
				setCompleted(response.data.completed);
				setInPlans(response.data.inPlans);
				setAbandoned(response.data.abandoned);
				setPlaying(response.data.playing);
			})
			.catch(error => {
				console.log("An error occurred:", error.response);
			});
		axios
			.get(
				"http://localhost:1337/api/users/me?populate[collections][populate]=*"
			)
			.then(response => {
				const newCollections = [];
				for (const collection of response.data.collections) {
					newCollections.push({
						id: collection.id,
						title: collection.name,
						src:
							url +
							collection.backgroundPicture.formats.small.url,
						value: collection.games.length,
						backgroudSRC: "nazwa gry",
					});
				}
				setCollections(newCollections);
			})
			.catch(error => {
				console.log("An error occurred:", error.response);
			});
	}, []);

	return (
		<div className="userProfile">
			<ProfileHeader
				src={backgroundPicture}
				avatarSRC={profilePicture}
				username={username}
			/>

			<p className="userProfile--summary">Summary</p>
			<div className="profileButtonsBar">
				<CategoryCard
					title="Completed"
					slug="completed"
					src="completed.png"
					value={completed !== undefined ? completed.length : 0}
					owner={username}
				/>
				<CategoryCard
					title="In plans"
					slug="inPlans"
					src="in_plans.png"
					value={inPlans !== undefined ? inPlans.length : 0}
					owner={username}
				/>
				<CategoryCard
					title="Abandoned"
					slug="abandoned"
					src="abandoned.png"
					value={abandoned !== undefined ? abandoned.length : 0}
					owner={username}
				/>
				<CategoryCard
					title="Playing"
					slug="playing"
					src="playing.png"
					value={playing !== undefined ? playing.length : 0}
					owner={username}
				/>
				{/* <CategoryCard title="abandoned" value={abandoned.length} />
				<CategoryCard title="playing" value={playing.length} /> */}
				{/* {profileButtons.map(item => (
					<CategoryCard
						key={item.id}
						src={item.src}
						title={item.title}
						value={item.value}
					/>
				))} */}
			</div>
			<p className="userProfile--collections">Collections</p>
			<div className="collectionsButtonsBar">
				{collections?.map(item => (
					<CollectionCard
						id={item.id}
						key={item.id}
						src={item.src}
						title={item.title}
						value={item.value}
						backgroudSRC={item.backgroudSRC}
					/>
				))}

				{}
			</div>
		</div>
	);
}
export default UserProfile;
