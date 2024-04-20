import { Document } from "../../../components/Documents";
import Avatar from "@mui/material/Avatar";
import {
  Container,
  Box,
  Grid,
  Divider,
  Paper,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../../../components/VisuallyHiddenInput";
import React from "react";
import { useParams } from "react-router-dom";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import axios from "axios";
import { ListComment } from "../../../components/ListComment";
import { FormateDate } from "../../../helpers/utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { handleUpdateStatus } from "../../../actions/ReportActions";
import {
  AlertAcceptDeleteImage,
  AlertDialog,
  AlertTopRight,
} from "../../../components/AlertDialog";
import { message } from "../../../helpers/messageConstant";
import { checkAuth } from "../../../actions/UserActions";
import { useMediaQuery } from "@mui/material";
export const DocumentStudent = () => {
  const navigate = useNavigate();
  const matches720 = useMediaQuery("(max-width:720px)");
  const matches576 = useMediaQuery("(max-width:576px)");
  const matches880 = useMediaQuery("(max-width:880px)");
  const { fileId, reportId, id } = useParams();
  const [fileList, setFileList] = React.useState([]);
  const [isUploadedImages, setIsUploadedImages] = React.useState(false);
  const [isLoadedImages, setIsLoadedImages] = React.useState(false);
  const [isUpdateReport, setIsUpdateReport] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState("");
  const [topicInfor, setTopicInfor] = React.useState({});
  const [isAllowedUpdateReport, setAllowedUpateReport] = React.useState(true);
  const [finalDate, setFinalDate] = React.useState("");
  const [comments, setComments] = React.useState(undefined);
  const [alertDiaglog, setOpenAlert] = React.useState(false);
  const [alertDeleteImage, setAlertDeleteImage] = React.useState(false);
  const [openNotify, setOpenNotify] = React.useState(false);
  const [messageNoify, setMessageNotify] = React.useState("");
  const [isPublishReportExisted, setIsPublishedReportExisted] =
    React.useState(false);

  const handleImageSelected = (event) => {
    setSelectedImg(event.target.alt);
  };
  const fetchComment = () => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      navigate("/signin");
      return;
    }
    const decoded = jwtDecode(cookie);
    const data = {
      publishedReportId: null,
      reportId: reportId,
      responseForUserId: parseInt(decoded["usid"]),
    };
    axios
      .post(apiEndpointLocal + path.comment.getReportComment, data)
      .then((rep) => setComments(rep.data));
  };
  const handleRemoveImage = () => {
    axios
      .delete(apiEndpointLocal + path.file.delete + selectedImg)
      .then((response) => {
        setSelectedImg("");
        setOpenNotify(true);
        setMessageNotify(message.deleteImage);
        setAlertDeleteImage(false);
      })
      .catch((err) => console.log(err));
  };
  const handleFileChange = async (event) => {
    const images = event.target.files;
    if (fileList?.length + images?.length > 10) {
      setOpenAlert(true);
    } else {
      const array = Array.from(images);
      const files = new FormData();
      array.forEach((fil, index) => {
        files.append("files", fil);
      });
      files.append("reportId", reportId);
      await axios
        .post(apiEndpointLocal + path.file.uploadImages, files)
        .then((response) => {
          setIsUploadedImages(true);
          setOpenNotify(true);
          setMessageNotify(message.uploadImagesSuccss);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleLoadImages = async () => {
    const data = {
      reportId: reportId,
      type: "image",
    };
    const response = await axios.post(
      apiEndpointLocal + path.fileReport.loadImages,
      data
    );
    if (response.data === "") {
      setIsLoadedImages(false);
    } else {
      setIsLoadedImages(true);
      setFileList(response.data);
    }
  };
  React.useEffect(() => {
    const cookie = Cookies.get("us");
    const input = {
      token: cookie,
    };
    checkAuth(input, cookie)
      .then((response) => {
        const data = response.data;
        if (data.role === "UNAUTHORIZED") {
          navigate("/signin");
          Cookies.remove("us");
        }
      })
      .catch(() => {
        navigate("/signin");
        Cookies.remove("us");
      });
    axios
      .post(
        apiEndpointLocal + path.publishedReport.isPublishReportExist + reportId
      )
      .then((rep) => {
        setIsPublishedReportExisted(rep.data);
      });
  });
  React.useEffect(() => {
    handleLoadImages();
    fetchComment();
    axios
      .get(apiEndpointLocal + path.students.getTopicId + id)
      .then((response) => setTopicInfor(response.data));
  }, []);
  React.useEffect(() => {
    if (isUploadedImages === true) {
      handleLoadImages();
      setIsUploadedImages(false);
    }
  }, [isUploadedImages]);
  React.useEffect(() => {
    if (selectedImg === "") {
      handleLoadImages();
    }
  }, [selectedImg]);
  React.useEffect(() => {
    if (isUpdateReport === true) {
      handleUpdateStatus("Pending", null, reportId, "STUDENT");
      setIsUpdateReport(false);
    }
  }, [isUpdateReport]);
  React.useEffect(() => {
    if (topicInfor !== undefined) {
      const dateFinal = new Date(topicInfor.finalDate);
      const formatFinal = FormateDate(dateFinal);
      const currentDate = new Date();
      setFinalDate(formatFinal);
      setAllowedUpateReport(currentDate < dateFinal);
    }
  }, [topicInfor]);
  React.useEffect(() => {
    if (openNotify) {
      setTimeout(() => {
        setOpenNotify(false);
      }, 3000);
    }
  }, [openNotify]);
  return (
    <Container maxWidth="xl">
      <AlertTopRight open={openNotify} message={messageNoify} />
      <Paper
        elevation={2}
        style={{
          margin: "20px 0px",
          padding: "0 25px",
        }}
      >
        <Typography
          padding="10px 0px"
          fontSize={matches720 ? 20 : 30}
          fontWeight={600}
        >
          Topic: {topicInfor.name}
        </Typography>
        <Box display="flex" pb={2}>
          <Typography fontSize={matches720 ? 15 : 20}>
            Falcuty: Information Technology
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h7">
            Description: {topicInfor.description}
          </Typography>
        </Box>
        <Divider></Divider>
        <Typography mt={1} fontSize={20}>
          Author:{" "}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Avatar
            alt="Student Name"
            src="https://th.bing.com/th/id/OIP.hoETRgtHlkpHNkbg4pI1jgAAAA?rs=1&pid=ImgDetMain"
          />
          <Typography pl={1} color="#404a86" fontWeight={600}>
            Nguyen Van B
          </Typography>
        </Box>
        <Box alignItems="center" mt={2}>
          <Typography color="#ef6c00" fontWeight={600}>
            Published Date: 02/02/2002
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1} pb={1}>
          <RemoveRedEyeIcon />
          <Typography color="#303f9f" fontWeight={600}>
            10000
          </Typography>
        </Box>
      </Paper>
      <Grid container spacing={0}>
        <Grid item xs={matches880 ? 12 : 9}>
          {fileList === undefined ? (
            ""
          ) : (
            <Document
              id={fileId}
              allowedAction={
                isAllowedUpdateReport
                  ? isPublishReportExisted
                    ? false
                    : true
                  : false
              }
              role="STUDENT"
              setMakeUpdated={setIsUpdateReport}
              lastDateAction={finalDate}
              reportId={reportId}
            />
          )}
        </Grid>
        {matches880 ? (
          ""
        ) : (
          <Grid item xs={0.5} style={{ paddingLeft: 0 }}>
            <Divider orientation="vertical" />
          </Grid>
        )}

        <Grid item xs={matches880 ? 12 : 2.5}>
          <Box>
            <Typography fontSize={18} fontWeight={600}>
              Report Images: (Max 10 images)
            </Typography>
          </Box>
          <Box>
            <ImageList
              sx={{ width: "100%", height: matches880 ? 500 : 700 }}
              cols={1}
            >
              {!isLoadedImages && fileList?.length === 0 ? (
                <Typography align="center" margin={"auto"} maxWidth="100%">
                  <Alert severity="info">No images</Alert>
                </Typography>
              ) : (
                fileList?.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      srcSet={`https://comp1640storage.blob.core.windows.net/hehe/${item?.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`https://comp1640storage.blob.core.windows.net/hehe/${item?.id}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.id}
                      loading="lazy"
                      onClick={handleImageSelected}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </ImageListItem>
                ))
              )}
            </ImageList>
          </Box>
          <Box display="block">
            {isAllowedUpdateReport === true ? (
              <>
                {fileList?.length >= 10 ? (
                  <Alert severity="warning" style={{ marginBottom: "10px" }}>
                    You have uploaded maximum images for this report.
                  </Alert>
                ) : (
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    style={{
                      marginBottom: 15,
                    }}
                    disabled={fileList?.length === 10 ? true : false}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  disabled={selectedImg === "" ? true : false}
                  onClick={() => setAlertDeleteImage(true)}
                >
                  Remove Image
                </Button>
              </>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} mt={3} mb={5}>
        <Grid item xs={matches880 ? 12 : 9}>
          <Box mb={2} mt={5}>
            <Typography variant="h5">Comment</Typography>
            <Divider />
          </Box>
          {comments?.length === 0 ? (
            <Alert severity="info">
              Your coordinator doesnt give any feedback in this report.
            </Alert>
          ) : (
            <ListComment comments={comments} matches880={matches880} />
          )}
        </Grid>
      </Grid>
      <AlertDialog
        header="Maximum Uploaded Images"
        text="You have uploaded maximum allowed images for one report"
        isAlert={alertDiaglog}
        setIsAlert={setOpenAlert}
      />
      <AlertAcceptDeleteImage
        isAlert={alertDeleteImage}
        setIsAlert={setAlertDeleteImage}
        deleteAction={handleRemoveImage}
        header="Remove Image"
        text="Are you sure you want to delete this image?"
        url={selectedImg}
      />
    </Container>
  );
};
