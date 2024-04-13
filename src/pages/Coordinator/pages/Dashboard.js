import * as React from 'react';
import { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Container} from '@mui/material';
import { axisClasses } from '@mui/x-charts';

const FacultyData = {
  totalContributions: 123,
  totalTopics: 45,
  totalUploadedContributions: 87,
  totalPublishedContributions: 64,
};

const data = [
  { id: 0, value: 250,  label: 'Approved' },
  { id: 1, value: 95,   label: 'Rejected' },
  { id: 2, value: 60,   label: 'Pending'  },
];

const year =  [
  { id: 0, label: '2019-2020'},
  { id: 1, label: '2021-2022'},
  { id: 2, label: '2023-2024'},
];

const valueFormatter = (value) => `${value} contributions`;

const chartSetting = {
  yAxis: [
    {
      label: 'Contributions',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const size = {
  width: 400,
  height: 200,
};

const dataset = [
  {
    Topic1: 50,
    Topic2: 52,
    Topic3: 78,
    Topic4: 28,
  },
  {
    Topic1: 50,
    Topic2: 52,
    Topic3: 78,
    Topic4: 28,
  },
];

export default function CoordinatorDashboard() {
  const [selectedPieOption, setSelectedPieOption] = useState(year.id=0);

  return (
    <div>
    <Container maxWidth="xl">
    <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="SelectYear">Academic Year</InputLabel>
          <Select 
                labelId="SelectYear"
                value={selectedPieOption}
                label='Academic Year'
                onChange={(event) => setSelectedPieOption(event.target.value)}
              >
                {year.map((item) => (
                  <MenuItem key={item.id} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}  justifyContent={'space-between'}>
          <Grid item xs={2}> 
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalContributions}</Typography>
              <Typography variant="body2">Total Contributions</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalTopics}</Typography>
              <Typography variant="body2">Total Topics</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalUploadedContributions}</Typography>
              <Typography variant="body2">Uploaded Contributions</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalPublishedContributions}</Typography>
              <Typography variant="body2">Published Contributions</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Stack direction="row" width="100%" textAlign="center" spacing={2} divider={<Divider orientation="vertical" flexGrow />}>
        <Box sx={{
          p: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}flexGrow={1}>
          <Typography>Contribution Statistics</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="SelectYear">Academic Year</InputLabel>
              <Select 
                    labelId="SelectYear"
                    value={selectedPieOption}
                    label='Academic Year'
                    onChange={(event) => setSelectedPieOption(event.target.value)}
                  >
                    {year.map((item) => (
                      <MenuItem key={item.id} value={item.label}>
                        {item.label}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          <PieChart
            series={[
              {
                arcLabel: (item) => ` ${item.value}`,
                arcLabelMinAngle: 45,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                data,
              },
            ]}
            sx={{
              [`& .${CoordinatorDashboard.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
            {...size}
          />
        </Box>
        <Box sx={{
          p: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }} flexGrow={1} justifyContent={'center'}>
          <Typography>Topic Contribution Statistics</Typography>
            <BarChart
              margin={{
                left: 80,
                right: 80,
                top: 80,
                bottom: 80,
              }}
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'topic' }]}
              series={[
                { dataKey: 'Topic1', label: 'Topic 1', valueFormatter },
                { dataKey: 'Topic2', label: 'Topic 2', valueFormatter },
                { dataKey: 'Topic3', label: 'Topic 3', valueFormatter },
                { dataKey: 'Topic4', label: 'Topic 4', valueFormatter },
              ]}
              {...chartSetting}
            />
        </Box>
      </Stack>
    </Container>

    </div>
  );
}