import { useParams } from "react-router";
function Character() {
  const { characterID } = useParams();
  return (
    <div>
      <h1>Character</h1>
      <p>CharacterID is {characterID}</p>
    </div>
  );
}
export default Character;
