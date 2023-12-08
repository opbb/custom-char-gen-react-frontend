function ListAccordionItem({
  id,
  title,
  AboveListComponent,
  listContents,
  ListContentsComponentType,
}) {
  const isAboveListComponent = AboveListComponent !== undefined;
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded="true"
          aria-controls={id}
        >
          {title}
        </button>
      </h2>
      <div id={id} className="accordion-collapse collapse show">
        <div className="accordion-body px-0 py-2">
          {isAboveListComponent ? (
            <div className="mb-1">
              <AboveListComponent />
            </div>
          ) : (
            <></>
          )}
          <ul className="list-group">
            {listContents.map((content, index) => (
              <li key={index} className="list-group-item">
                <ListContentsComponentType content={content} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ListAccordionItem;
