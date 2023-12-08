import { useParams } from "react-router";
function Template() {
  const { templateID } = useParams();
  return (
    <div>
      <h1>Template</h1>
      <p>TemplateID is {templateID}</p>
    </div>
  );
}
export default Template;
