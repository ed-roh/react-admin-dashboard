import { PieChart } from '@mui/x-charts/PieChart';

export function MyPieChart({data}) {

return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 30,
          outerRadius: 90,
          paddingAngle: 3,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        }
        ]}
        
    />
);
}

export default MyPieChart;