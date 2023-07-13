import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
import './Analytics.css'

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const options = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Marks Obtained',
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
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        beginAtZero: true,
        stepSize: 5,
      },
    },
  },
};




const Analytics = () => {

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
      <div className='main-chart'>
      <div className="card-1">
	 <div className='text'>
    <p>Your Attempt  <span>80</span></p>
    <p>Attempted On  <span>2023/04/30</span></p>
    <p>Time Taken  <span>45m</span></p>
    <p>Bank  <span>1/5</span></p>
    <p>Correct  <span>30%</span></p>
    <p>Marks Obtained  <span>68.00/80</span></p>
    <p>Shipped  <span></span></p>
    <p>Time Taken  <span>46m</span></p>
    <p>Correct Questions  <span>36</span></p>
    <p>Incorrect Questions  <span></span></p>
    <p>Skipped Question  <span></span></p>
    </div>
  </div>
  


      <div className="content" style={{backgroundColor:"white"}}>
      <div className='chart' style={{ width: '82%', height: '400px', marginLeft: '35px auto' }}>
        <Bar data={data} options={options} />
      </div>
      </div>
      </div>
    );
  };
  
  export default Analytics;