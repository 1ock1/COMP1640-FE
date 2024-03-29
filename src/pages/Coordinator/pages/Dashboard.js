import * as React from 'react';
import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { axisClasses } from '@mui/x-charts';
import { InputLabel } from '@mui/material';

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

const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
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
    HaNoi: 59,
    CanTho: 57,
    DaNang: 86,
    HoChiMinhCity: 21,
    month: 'Jan',
  },
  {
    HaNoi: 50,
    CanTho: 52,
    DaNang: 78,
    HoChiMinhCity: 28,
    month: 'Fev',
  },
  {
    HaNoi: 47,
    CanTho: 53,
    DaNang: 106,
    HoChiMinhCity: 41,
    month: 'Mar',
  },
  {
    HaNoi: 54,
    CanTho: 56,
    DaNang: 92,
    HoChiMinhCity: 73,
    month: 'Apr',
  },
  {
    HaNoi: 57,
    CanTho: 69,
    DaNang: 92,
    HoChiMinhCity: 99,
    month: 'May',
  },
  {
    HaNoi: 60,
    CanTho: 63,
    DaNang: 103,
    HoChiMinhCity: 144,
    month: 'June',
  },
  {
    HaNoi: 59,
    CanTho: 60,
    DaNang: 105,
    HoChiMinhCity: 319,
    month: 'July',
  },
  {
    HaNoi: 65,
    CanTho: 60,
    DaNang: 106,
    HoChiMinhCity: 249,
    month: 'Aug',
  },
  {
    HaNoi: 51,
    CanTho: 51,
    DaNang: 95,
    HoChiMinhCity: 131,
    month: 'Sept',
  },
  {
    HaNoi: 60,
    CanTho: 65,
    DaNang: 97,
    HoChiMinhCity: 55,
    month: 'Oct',
  },
  {
    HaNoi: 67,
    CanTho: 64,
    DaNang: 76,
    HoChiMinhCity: 48,
    month: 'Nov',
  },
  {
    HaNoi: 61,
    CanTho: 70,
    DaNang: 103,
    HoChiMinhCity: 25,
    month: 'Dec',
  },
];

export default function CoordinatorDashboard() {
  const [selectedPieOption, setSelectedPieOption] = useState(year.id=0);
  const [selectedBarOption, setSelectedBarOption] = useState('HaNoi');
  const [selectedDashboardOption, setSelectedDashboardOption] = useState('Year');

  return (
    <div>
      <Box sx={{ '& .MuiSelect-root': { fontSize: '14px' } }}>
      <InputLabel shrink htmlFor="select-outlined">Select Year</InputLabel>
        <Select
              value={selectedDashboardOption}
              onChange={(event) => setSelectedDashboardOption(event.target.value)}
              fullWidth
            >
              {year.map((item) => (
                <MenuItem key={item.id} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
        </Select>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}> {/* Adjust width to xs={4} for equal columns */}
          </Grid>
          <Grid item xs={2}> {/* Adjust width to xs={2} for equal columns */}
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalContributions}</Typography>
              <Typography variant="body2">Total Contributions</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}> {/* Adjust width to xs={2} for equal columns */}
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalTopics}</Typography>
              <Typography variant="body2">Total Topics</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}> {/* Adjust width to xs={2} for equal columns */}
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalUploadedContributions}</Typography>
              <Typography variant="body2">Uploaded Contributions</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}> {/* Adjust width to xs={2} for equal columns */}
            <Paper sx={{ padding: 2, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{FacultyData.totalPublishedContributions}</Typography>
              <Typography variant="body2">Published Contributions</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Stack direction="row" width="100%" textAlign="center" spacing={2} divider={<Divider orientation="vertical" flexGrow />}>
        <Box flexGrow={1}>
          <Typography>Contribution</Typography>
          <Select

            value={selectedPieOption}
            onChange={(event) => setSelectedPieOption(event.target.value)}
          >
            {year.map((item) => (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
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
        <Box flexGrow={1}>
          <Typography>Item</Typography>
          <Select
              value={selectedBarOption}
              onChange={(event) => setSelectedBarOption(event.target.value)}
            >
              {year.map((item) => (
                <MenuItem key={item.id} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[
                { dataKey: 'HaNoi', label: 'Ha Noi', valueFormatter },
                { dataKey: 'CanTho', label: 'Can Tho', valueFormatter },
                { dataKey: 'DaNang', label: 'Da Nang', valueFormatter },
                { dataKey: 'HoChiMinhCity', label: 'Ho Chi Minh City', valueFormatter },
              ]}
              {...chartSetting}
            />
        </Box>
      </Stack>
    </div>
  );
}