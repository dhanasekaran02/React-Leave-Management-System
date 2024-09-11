import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels:["Casual", "Sick", "Paternal", "Maternal", "LOP", "Vacation"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ['#0096FF', '#E1C16E', '#F88379', '#FFD580', '#E4D00A', '#FBCEB1'],
          borderColor: "grey",
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true
      }
    });

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

export default PieChart;
