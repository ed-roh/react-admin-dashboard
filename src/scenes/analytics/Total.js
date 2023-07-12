import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const options = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Total Marks Obtained',
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
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        beginAtZero: true,
        stepSize: 5,
      },
    },
  },
};

const Total = () => {

  const [data, setData] = useState({
    labels: ['Week-1', 'Week-2', 'Week-3', 'Week-4', 'Week-5'],
    datasets: [
      {
        label: 'Marks obtained',
        data: [],
        backgroundColor: [
          'rgba(238, 125, 49, 0.8)', // Orange with transparency
          'rgba(41, 128, 185, 0.8)', // Dark blue with transparency
          'rgba(103, 58, 183, 0.8)', // Purple with transparency
          'rgba(26, 188, 156, 0.8)', // Turquoise with transparency
          'rgba(155, 89, 182, 0.8)', // Light purple with transparency
        ],
        borderColor: [
          'rgba(238, 125, 49, 1)', // Orange
          'rgba(41, 128, 185, 1)', // Dark blue
          'rgba(103, 58, 183, 1)', // Purple
          'rgba(26, 188, 156, 1)', // Turquoise
          'rgba(155, 89, 182, 1)', // Light purple
        ],
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: [
          'rgba(238, 125, 49, 1)', // Orange (hover)
          'rgba(41, 128, 185, 1)', // Dark blue (hover)
          'rgba(103, 58, 183, 1)', // Purple (hover)
          'rgba(26, 188, 156, 1)', // Turquoise (hover)
          'rgba(155, 89, 182, 1)', // Light purple (hover)
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://jsonplaceholder.typicode.com/users';
      const dataSet1 = [];

      try {
        const response = await axios.get(url);
        const res = response.data;

        for (const val of res) {
          dataSet1.push(val.id);
        }

        setData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: dataSet1,
              },
            ],
          }));
       } catch (error) {
          console.log('Error:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      
      <div style={{ width: '100%', maxWidth: '500px', height: '400px', margin: '60px auto' }}>
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  export default Total;