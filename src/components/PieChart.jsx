import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const legends = isDashboard ? undefined : [{
    anchor: "bottom",
    direction: "row",
    justify: false,
    translateX: 0,
    translateY: 56,
    itemsSpacing: 0,
    itemWidth: 100,
    itemHeight: 18,
    itemTextColor: "white",
    fontWeight: "bold",
    fontSize: "35px",
    itemDirection: "left-to-right",
    itemOpacity: 1,
    symbolSize: 20,
    symbolShape: "circle",
    effects: [{
      on: "hover",
      style: { itemTextColor: "black", },
    },
    ],
  },
  ];
      
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={!isDashboard} 
      arcLinkLabelsSkipAngle={isDashboard ? 10 : undefined}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[ 
        {
          anchor: "bottom",
          direction: isDashboard ? "column" : "row",
          justify: false,
          translateX: isDashboard ? 95 : 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: isDashboard ? 40 : 100,
          itemHeight: isDashboard ? 20 : 18,
          itemTextColor: "white",
          fontWeight: "bold",
          fontSize: isDashboard ? "20px" : "35px",
          itemOpacity: 1,
          symbolSize: isDashboard ? 10 : 20,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default PieChart;
