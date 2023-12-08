import { useParams } from "react-router";
function EditTemplate() {
  const { templateID } = useParams();
  return (
    <div>
      <h1>Edit Template</h1>
      <p>TemplateID is {templateID}</p>
    </div>
  );
}
export default EditTemplate;
