import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Example Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false, // Disable aspect ratio to fit into container
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Destroy existing chart before creating a new one
    return () => {
      myChart.destroy();
    };
  }, []);


  return (
    <div style={{ height: '350px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
