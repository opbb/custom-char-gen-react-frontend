import { useParams } from "react-router";
function RandomOptions() {
  const { randomOptionsID } = useParams();
  return (
    <div>
      <h1>Options List</h1>
      <p>OptionsListID is {randomOptionsID}</p>
    </div>
  );
}
export default RandomOptions;
