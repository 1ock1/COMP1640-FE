import "../helpers/document.css";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { apiEndpointStaging, path } from "../helpers/apiEndpoints";
import axios from "axios";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";
DocumentEditorContainerComponent.Inject(Toolbar);

export const Document = ({ id }) => {
  const [isDocumentChange, setDocumentChange] = React.useState(false);

  let container;
  async function save() {
    const file = id + ".docx";
    container.documentEditor.saveAsBlob("Docx").then((blob) => {
      const exportedDocument = blob;
      const formData = new FormData();
      formData.append("name", file);
      formData.append("data", exportedDocument);
      let req = new XMLHttpRequest();
      req.open("POST", apiEndpointStaging + path.file.save, true);
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 200) {
            setDocumentChange(false);
            loadSfdt();
          }
        }
      };
      req.send(formData);
    });
  }
  const loadSfdt = () => {
    const file = id + ".docx";
    axios
      .get(apiEndpointStaging + path.file.load + file)
      .then((response) => {
        container.documentEditor.open(response.data);
      })
      .catch((error) => {});
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "document");
    formData.append("studentId", 1);
    formData.append("topicId", 1);
    const response = await axios.post(
      apiEndpointStaging + path.file.upload,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  // const handleRemoveFile = () => {
  //   axios
  //     .delete(apiEndpointStaging + path.file.delete + "hehe.docx")
  //     .then((response) => console.log(response.data))
  //     .catch((err) => console.log(err));
  // };
  React.useEffect(() => {
    loadSfdt();
  });
  return (
    <>
      <DocumentEditorContainerComponent
        id="container"
        ref={(scope) => {
          container = scope;
        }}
        height={"800px"}
        serviceUrl="https://localhost:7044/api/File"
        enableToolbar={true}
        // toolbarItems={items}
        // readOnly={true}
        showPropertiesPane={false}
        enableComment
        // enableLockAndEdit={true}
        // restrictEditing={true}
        enableAutoFocus={false}
        enableTrackChanges={true}
        contentChange={() => setDocumentChange(true)}
        zoomFactor={0.8}
      />
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          style={{
            marginRight: 20,
          }}
          onClick={save}
          disabled={!isDocumentChange}
        >
          Save
        </Button>
        {/* <Button
          variant="contained"
          style={{
            marginRight: 20,
          }}
          color="error"
          onClick={handleRemoveFile}
        >
          Remove
        </Button> */}
      </Box>
    </>
  );
};
