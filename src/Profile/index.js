import { useParams } from "react-router";
function Profile() {
  const { userID } = useParams();
  return (
    <div>
      <h1>Profile</h1>
      <p>UserID is {userID}</p>
    </div>
  );
}
export default Profile;
