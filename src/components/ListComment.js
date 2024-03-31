import { Box, Grid, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { FormateDate } from "../helpers/utils";
export const ListComment = ({ comments }) => {
  return (
    <>
      {comments?.map((obj, idx) => {
        const date = FormateDate(obj.date);
        return (
          <Grid container spacing={0} mt={3}>
            <Grid item xs={1} mt={2}>
              <Avatar
                alt="Remy Sharp"
                src="https://th.bing.com/th/id/R.c7e874ef278d1dc3f41f8d143d917a86?rik=A1FEe9B0aU28Rw&pid=ImgRaw&r=0"
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid item xs={11}>
              <Paper elevation={1}>
                <Box padding={1} pl={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width={300}
                  >
                    <Typography fontWeight={600}>Coordinator</Typography>
                    <Typography>{date}</Typography>
                  </Box>
                  <Box pt={2}>
                    <Typography>{obj.content}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
