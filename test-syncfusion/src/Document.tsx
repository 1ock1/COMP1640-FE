import * as ReactDOM from 'react-dom';
import * as React from 'react';
import axios from 'axios';
import {
    DocumentEditorComponent, Toolbar
} from '@syncfusion/ej2-react-documenteditor';

DocumentEditorComponent.Inject(Toolbar);
function App() {
  let container: DocumentEditorComponent;

  React.useEffect(() => {
    loadSfdt();
  }, []);
  const loadSfdt = () => {
    axios
      .get("https://localhost:7044/WeatherForecast/RetrieveDocument")
      .then((response) => {
        container.addEventListener("click", (event)=>{
          console.log(event)
        })
        container.documentEditor.open(response.data);
        container.enableComment = true;
        // container.restrictEditing = true;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // const handleContentChange = (event) => {
  //   // Handle content changes here
  //   // const { action, range } = args;
  //   console.log(event);
  //   // if (action === "ContentChanged") {
  //   //   // Extract the start and end positions of the change
  //   //   const { start, end } = range;
  //   //   console.log("Content changed at range:", start, "-", end);
  //   // }
  // };
  return (
    <div>
      <DocumentEditorComponent
        id="container"
        ref={(scope) => {
          container = scope;
        }}
        height={"590px"}
        serviceUrl="http://localhost:62870/api/documenteditor/"
        readOnly={true}
        
        enableComment
        // enableLockAndEdit={true}
        // restrictEditing={true}
        enableAutoFocus={false}
        // contentChange={handleContentChange}
        enableTrackChanges
      />
    </div>
  );
}
export default App;