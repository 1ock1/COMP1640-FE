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
import { useNavigate } from "react-router-dom";
import { ListComment } from "../../../components/ListComment";
export const DocumentManager = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [reportInfor, setReportInfor] = React.useState({});
  const [commentList, setCommentList] = React.useState(undefined);
  const [images, setImages] = React.useState(undefined);
  const [reportDocument, setReportDocument] = React.useState({});
  React.useState(false);

  const currentDate = new Date();
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

  React.useEffect(() => {
    axios
      .post(apiEndpointLocal + path.fileReport.getAllFileReport + reportId)
      .then((rep) => {
        const imagesArray = rep.data.filter((obj) => obj.type === "image");
        const document = rep.data.find((obj) => obj.type === "document");
        setImages(imagesArray);
        setReportDocument(document);
      });
    axios
      .post(apiEndpointLocal + path.report.getReportInformation + reportId)
      .then((rep) => {
        setReportInfor(rep.data);
      });
  }, []);
  React.useEffect(() => {
    if (reportInfor !== null) {
      fetchComment();
    }
  }, [reportInfor]);
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
              Description: Nghien cuu ve de tai xay dung chu nghia xa hoi va xay
              dung cac nhu cau thiet yeu cua cuoc song ca nhanh
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
                allowedAction={false}
                role="MANAGER"
                reportId={reportId}
              />
            )}
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
            <Box mb={2} mt={5}>
              <Typography variant="h5">Coordinator Comment</Typography>
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
