import React, { useEffect, useState } from 'react';
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
    // labels: [],
    datasets: [
      {
        label: 'Marks obtained',
        data: [],
        backgroundColor: [
          'rgba(238, 125, 49, 0.8)', // Orange with transparency
        ],
        borderColor: [
          'rgba(238, 125, 49, 1)', // Orange
        ],
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: [
          'rgba(238, 125, 49, 1)', // Orange (hover)
        ],
      },
    ],
  });

  const [data1,setData1] = useState()
  useEffect(() => {
    const fetchData = async() => {
      const url = 'http://192.168.0.112:3000/getCourseData';

   let data = await axios.get(url);

   console.log(data.data[0].Name);

   if(data){

    setData1(data.data[0])

   }
        
           
  }
    fetchData();
  }, []);

  console.log(data1,"data1")
  return (
    <div className="graph"style={{ width: '100%', maxWidth: '500px', height: '400px', margin: '60px auto' }}>
          <Bar data={data} options={options} />
        </div>
  );
}
  
export default Total;