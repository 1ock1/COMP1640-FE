import "../helpers/document.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { apiEndpointStaging, path } from "../helpers/apiEndpoints";
import axios from "axios";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";
import { HelpTextDatInfor } from "./HelpTextDate";
import LinearProgress from "@mui/material/LinearProgress";
import { AlertAcceptSaveChange, AlertTopRight } from "./AlertDialog";
import { message } from "../helpers/messageConstant";
DocumentEditorContainerComponent.Inject(Toolbar);

export const Document = ({
  id,
  allowedAction,
  role,
  setMakeEditted,
  setMakeUpdated,
  lastDateAction,
  reportId,
}) => {
  const [isDocumentChange, setDocumentChange] = React.useState(false);
  const [isUpdatedNewFile, setUpdatedNewFile] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isDownloaded, setIsDowloaded] = React.useState(false);
  const [openAlert, setOpentAlert] = React.useState(false);
  const [openSaveChangeAlert, setOpenSaveChangeAlert] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState("");
  let container;
  async function save() {
    const file = id;
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
            setIsSaved(true);
          }
        }
      };
      req.send(formData);
    });
    if (role === "COORDINATOR") {
      setOpentAlert(true);
      setMessageAlert(message.saveFileSuccess);
      setMakeEditted(true);
      setOpenSaveChangeAlert(false);
    }
    if (role === "STUDENT") {
      setOpentAlert(true);
      setMessageAlert(message.saveFileSuccess);
      setMakeUpdated(true);
      setOpenSaveChangeAlert(false);
    }
  }
  const loadSfdt = () => {
    axios
      .get(apiEndpointStaging + path.file.load + id)
      .then((response) => {
        container.documentEditor.open(response.data);
      })
      .catch((error) => {});
  };
  const handleUpdateFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("guid", id);
    const response = await axios.put(
      apiEndpointStaging + path.file.update,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data === "Uploaded File Successfully") {
      setUpdatedNewFile(true);
      setOpentAlert(true);
      setMessageAlert(message.uploadNewFileSuccess);
    }
    if (role === "STUDENT") {
      setMakeUpdated(true);
      setOpentAlert(true);
      setMessageAlert(message.uploadNewFileSuccess);
    }
  };
  const downloadZipFile = () => {
    setIsDowloaded(true);
    fetch(apiEndpointStaging + path.file.downloadZip + reportId, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Report " + reportId;
        link.click();
        setOpentAlert(true);
        setMessageAlert(message.downloadSuccess);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // const handleRemoveFile = () => {
  //   axios
  //     .delete(apiEndpointStaging + path.file.delete + "hehe.docx")
  //     .then((response) => console.log(response.data))
  //     .catch((err) => console.log(err));
  // };
  React.useEffect(() => {
    if (!isDocumentChange) {
      loadSfdt();
    }
  });
  React.useEffect(() => {
    if (isSaved === true) {
      loadSfdt();
      setIsSaved(false);
    }
  }, [isSaved]);
  React.useEffect(() => {
    if (isUpdatedNewFile === true) {
      loadSfdt();
      setUpdatedNewFile(false);
    }
  }, [isUpdatedNewFile]);
  React.useEffect(() => {
    if (isDownloaded) {
      setTimeout(() => {
        setIsDowloaded(false);
      }, 5000);
    }
  }, [isDownloaded]);
  React.useEffect(() => {
    if (openAlert) {
      setTimeout(() => {
        setOpentAlert(false);
      }, 2000);
    }
  }, [openAlert]);
  return (
    <>
      <AlertTopRight open={openAlert} message={messageAlert} />
      {id !== undefined && (
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
          currentUser={role === "STUDENT" ? "Student" : "Coordinator"}
        />
      )}
      <Grid container spacing={0} justifyContent="space-between">
        <Grid item>
          <Box mt={2} mb={2}>
            {allowedAction === true &&
            (role === "STUDENT" || role === "COORDINATOR") ? (
              <Button
                variant="contained"
                style={{
                  marginRight: 20,
                }}
                onClick={() => setOpenSaveChangeAlert(true)}
                disabled={!isDocumentChange}
              >
                Save
              </Button>
            ) : (
              ""
            )}
            {allowedAction === true && role === "STUDENT" ? (
              <>
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Update Current File
                  <VisuallyHiddenInput
                    type="file"
                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleUpdateFile}
                  />
                </Button>
              </>
            ) : (
              ""
            )}
            <HelpTextDatInfor
              text={"You can edit this report before "}
              date={lastDateAction}
            />

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
        </Grid>
        <Grid item>
          <Box mt={2} mb={2}>
            <Button
              onClick={downloadZipFile}
              variant="contained"
              color="success"
              disabled={isDownloaded}
              download
            >
              <FileDownloadIcon /> Download Zip
            </Button>
            {isDownloaded && <LinearProgress />}
          </Box>
        </Grid>
      </Grid>
      <AlertAcceptSaveChange
        isAlert={openSaveChangeAlert}
        setIsAlert={setOpenSaveChangeAlert}
        saveChangeAction={save}
        text="Your change will be saved. Are you sure ?"
        header="Save Change"
      />
    </>
  );
};
