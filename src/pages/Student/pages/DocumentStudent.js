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
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../../../components/VisuallyHiddenInput";
import React from "react";
import { useParams } from "react-router-dom";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
import axios from "axios";
export const DocumentStudent = () => {
  const { fileId, reportId } = useParams();
  const [fileList, setFileList] = React.useState([]);
  const [isUploadedImages, setIsUploadedImages] = React.useState(false);
  const [isLoadedImages, setIsLoadedImages] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState("");
  const handleImageSelected = (event) => {
    setSelectedImg(event.target.alt);
  };
  const handleRemoveImage = () => {
    axios
      .delete(apiEndpointStaging + path.file.delete + selectedImg)
      .then((response) => {
        setSelectedImg("");
      })
      .catch((err) => console.log(err));
  };
  const handleFileChange = async (event) => {
    const images = event.target.files;
    const array = Array.from(images);
    const files = new FormData();
    array.forEach((fil, index) => {
      files.append("files", fil);
    });
    files.append("reportId", reportId);
    await axios
      .post(apiEndpointStaging + path.file.uploadImages, files)
      .then((response) => setIsUploadedImages(true))
      .catch((err) => console.log(err));
  };
  const handleLoadImages = async () => {
    const data = {
      reportId: reportId,
      type: "image",
    };
    const response = await axios.post(
      apiEndpointStaging + path.fileReport.loadImages,
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
    handleLoadImages();
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
  return (
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
          Topic: Nghien cuu ve de tai xay dung chu nghia xa hoi va xay dung cac
          nhu cau thiet yeu cua cuoc song ca nhanh
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
          {fileList === undefined ? "" : <Document id={fileId} />}
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
              {!isLoadedImages
                ? ""
                : fileList?.map((item) => (
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
                  ))}
            </ImageList>
          </Box>
          <Box display="block">
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              fullWidth
              style={{
                marginBottom: 15,
              }}
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              disabled={selectedImg === "" ? true : false}
              onClick={handleRemoveImage}
            >
              Remove Image
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
