import axios from "axios";
import React from "react";
import { Document } from "../../../components/Documents";
import {
  Container,
  Grid,
  Divider,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Paper,
  Avatar,
  Alert,
  Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useParams } from "react-router-dom";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import { FormateDate, VietNamDate } from "../../../helpers/utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AddComment } from "../../../components/AddComment";
import { ListComment } from "../../../components/ListComment";
import { handleUpdateStatus } from "../../../actions/ReportActions";
import PublicIcon from "@mui/icons-material/Public";
import { HelpTextDateWarning } from "../../../components/HelpTextDate";
import { PublishedReportForm } from "../components/PublishedReportForm";
export const DocumentCoordinator = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [reportInfor, setReportInfor] = React.useState({});
  const [comment, setComment] = React.useState("");
  const [commentList, setCommentList] = React.useState(undefined);
  const [images, setImages] = React.useState(undefined);
  const [reportDocument, setReportDocument] = React.useState({});
  const [checkIsAllowedEditted, setCheckIsAllowedEditted] =
    React.useState(false);
  const [checkIsAllowedPublished, setCheckIsAllowedPublished] =
    React.useState(false);
  const [isMakeEditted, setMakeEditted] = React.useState(false);
  const [topicId, setTopicId] = React.useState(-1);
  const [lastDateComment, setLastDateComment] = React.useState("");
  const [afterDatePublish, setAfterDatePublish] = React.useState("");
  const [openPublishForm, setOpenPublishForm] = React.useState(false);
  const [isPublishReportExisted, setIsPublishedReportExisted] =
    React.useState(false);

  const currentDate = new Date();
  const formatCurrentDate = FormateDate(currentDate);
  const handleOpenPublishForm = () => {
    setOpenPublishForm(true);
  };

  const handleClosePublishForm = () => {
    setOpenPublishForm(false);
  };

  const handleCreatePublishedReport = (data) => {
    if (isPublishReportExisted === false) {
      axios
        .post(apiEndpointLocal + path.publishedReport.create, data)
        .then((rep) => {
          handleCheckIfPublishedReportExist();
        });
      handleUpdateStatus("Published", null, reportId, "COORDINATOR");
    }
  };
  const handleCheckIfPublishedReportExist = () => {
    axios
      .post(
        apiEndpointLocal + path.publishedReport.isPublishReportExist + reportId
      )
      .then((rep) => {
        setIsPublishedReportExisted(rep.data);
      });
  };
  const fetchComment = () => {
    const data = {
      publishedReportId: null,
      reportId: reportId,
      responseForUserId: reportInfor.studentId,
    };
    axios
      .post(apiEndpointLocal + path.comment.getReportComment, data)
      .then((rep) => setCommentList(rep.data));
  };
  const handleAddComment = () => {
    const currentDate = VietNamDate();
    const data = {
      content: comment,
      date: currentDate,
      isEdited: false,
      publishedReportId: null,
      reportId: reportId,
      responseForUserId: reportInfor.studentId,
    };
    axios
      .post(apiEndpointLocal + path.comment.createComment, data)
      .then((rep) => {
        fetchComment();
      });
  };
  const notificationData = (title) => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      navigate("/signin");
      return;
    }
    const currentDate = VietNamDate();
    const decoded = jwtDecode(cookie);
    const data = {
      title: title,
      description:
        "/student/topics/" +
        reportInfor.topicId +
        "/report/" +
        reportId +
        "/" +
        reportDocument.id,
      date: currentDate,
      isRead: false,
      toUserId: reportInfor.studentId,
      fromUserId: parseInt(decoded["usid"]),
    };
    return data;
  };
  React.useEffect(() => {
    axios
      .post(apiEndpointLocal + path.report.getReportInformation + reportId)
      .then((rep) => {
        setReportInfor(rep.data);
        setTopicId(rep.data.topicId);
        const lastDateComment = new Date(rep.data.lastDateComment);
        const formatLastDateComment = FormateDate(lastDateComment);
        setLastDateComment(formatLastDateComment);
        if (currentDate < lastDateComment) {
          setCheckIsAllowedEditted(true);
        } else {
          setCheckIsAllowedEditted(false);
        }
      });
    axios
      .post(apiEndpointLocal + path.fileReport.getAllFileReport + reportId)
      .then((rep) => {
        const imagesArray = rep.data.filter((obj) => obj.type === "image");
        const document = rep.data.find((obj) => obj.type === "document");
        setImages(imagesArray);
        setReportDocument(document);
      });
    handleCheckIfPublishedReportExist();
  }, []);
  React.useEffect(() => {
    if (reportInfor !== null) {
      fetchComment();
    }
  }, [reportInfor]);
  React.useEffect(() => {
    if (isMakeEditted === true && reportInfor !== null) {
      const data = notificationData(
        "Your contribution has editted by your coordinator"
      );
      axios
        .post(apiEndpointLocal + path.notify.createNoti, data)
        .then((rep) => {
          const data = rep.data;
        });
      handleUpdateStatus("Editted", null, reportId, "COORDINATOR");
      setMakeEditted(false);
    }
  }, [isMakeEditted]);
  React.useEffect(() => {
    if (comment !== "") {
      handleAddComment();
      const data = notificationData(
        "Your coordinator has given a new feedback to your contribution"
      );
      axios
        .post(apiEndpointLocal + path.notify.createNoti, data)
        .then((rep) => {
          const data = rep.data;
        });
    }
  }, [comment]);
  React.useEffect(() => {
    if (topicId !== -1) {
      axios
        .get(apiEndpointLocal + path.students.getTopicId + topicId)
        .then((response) => {
          const afterDatePublish = new Date(response.data.finalDate);
          const formatAfterDatePublish = FormateDate(afterDatePublish);
          setAfterDatePublish(formatAfterDatePublish);
          if (currentDate < afterDatePublish) {
            setCheckIsAllowedPublished(true);
          } else {
            setCheckIsAllowedPublished(false);
          }
        });
    }
  }, [topicId]);
  return (
    <>
      <Container maxWidth="xl">
        <Paper
          elevation={2}
          style={{
            margin: "20px 0px",
            padding: "0 25px",
          }}
        >
          <Typography padding="10px 0px" variant="h4" fontWeight={600}>
            Published Report: Title
          </Typography>
          <Typography pb={1} variant="h5" fontSize={20}>
            Topic: Nghien cuu ve de tai xay dung chu nghia xa hoi va xay dung
            cac nhu cau thiet yeu cua cuoc song ca nhanh
          </Typography>
          <Box display="flex" pb={2}>
            <Typography variant="h5" fontSize={20}>
              Academic Year: 2015 - 2016
            </Typography>
            <Typography paddingLeft={11.5} variant="h5" fontSize={20}>
              Falcuty: Information Technology
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h7">
              Description: Day la noi quy tu cua tat ca nhung nguoi co dam me ve
              triet hoc nop bai vao day. Khong thi 1 la 5 qua trung hai la 1 qua
              ten lua. Chung may nghe ro gi chua
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
          <Grid item xs={9}>
            {reportDocument === null ? (
              ""
            ) : (
              <Document
                id={reportDocument.id}
                allowedAction={checkIsAllowedEditted}
                role="COORDINATOR"
                setMakeEditted={setMakeEditted}
                lastDateAction={lastDateComment}
                reportId={reportId}
              />
            )}
            <Button
              variant="contained"
              color="secondary"
              disabled={checkIsAllowedPublished}
              onClick={handleOpenPublishForm}
            >
              {" "}
              <PublicIcon style={{ marginRight: 10 }} />
              Publis this report
            </Button>
            <PublishedReportForm
              open={openPublishForm}
              onClose={handleClosePublishForm}
              date={formatCurrentDate}
              reportId={reportId}
              disabled={isPublishReportExisted}
              submitAction={handleCreatePublishedReport}
            />
            <HelpTextDateWarning
              text={"You can only publish this report after"}
              date={afterDatePublish}
            />
          </Grid>
          <Grid item xs={0.5} style={{ paddingLeft: 0 }}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={2.5}>
            <Box>
              <Typography fontSize={18} fontWeight={600}>
                Report Images: (Max 10 images)
              </Typography>
            </Box>
            <Box>
              <ImageList sx={{ width: "100%", height: 700 }} cols={1}>
                {images?.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      srcSet={`https://comp1640storage.blob.core.windows.net/hehe/${item?.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`https://comp1640storage.blob.core.windows.net/hehe/${item?.id}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.id}
                      loading="lazy"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={0} mt={3} mb={5}>
          <Grid item xs={9}>
            <Box>
              <AddComment setComment={setComment} />
            </Box>
            <Box mb={2} mt={5}>
              <Typography variant="h5">Your Comment</Typography>
              <Divider />
            </Box>
            {commentList?.length === 0 ? (
              <Alert severity="info">
                You dont have any comment in this report.
              </Alert>
            ) : (
              <ListComment comments={commentList} />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
