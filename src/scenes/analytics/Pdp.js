import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);

const options = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'PDP Marks obtained',
      font: {
        size: 18,
        weight: 'bold',
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  },
};

const dataStyle = {
  label: 'Marks obtained',
  data: [],
  borderColor: 'rgba(238, 125, 49, 1)',
  borderWidth: 2,
  fill:true,
  pointRadius: 4,
  pointBorderWidth: 2,
  pointBackgroundColor: 'rgba(238, 125, 49, 1)',
  pointBorderColor: 'rgba(238, 125, 49, 1)',
  backgroundColor: 'rgba(238, 125, 49, 1)', // Transparent fill color
  backgroundImage: 'linear-gradient(to bottom, rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0))',
};


const Pdp = () => {
  const [data, setData] = useState({
    labels: ['Week-1', 'Week-2', 'Week-3', 'Week-4', 'Week-5'],
    datasets: [dataStyle],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.152:3000/getCourseData');
        const dataSet1 = response.data.map((val) => val.id);

        setData((prevState) => ({
          ...prevState,
          datasets: [{ ...prevState.datasets[0], data: dataSet1 }],
        }));
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='Pgraph' style={{ width: '100%', maxWidth: '500px', height: '400px', margin: '60px auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Pdp;
