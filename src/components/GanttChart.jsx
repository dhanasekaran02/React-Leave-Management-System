import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const GanttChart = () => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Dhanasekaran', 'Arun', 'Bhadriprasath', 'Surjitkumar', 'Cheran', 'Kishorkumar', 'Krishna'],
          datasets: [{
            label: 'Leave Calendar',
            data: [
              { x: '2023-12-01', y: new Date('2023-12-03').getTime(), end: new Date('2023-12-04').getTime() },
              { x: '2023-12-02', y: new Date('2023-12-05').getTime(), end: new Date('2023-12-06').getTime() },
              { x: '2023-12-01', y: new Date('2023-12-04').getTime(), end: new Date('2023-12-05').getTime() },
              { x: '2023-12-04', y: new Date('2023-12-05').getTime(), end: new Date('2023-12-06').getTime() },
              { x: '2023-12-02', y: new Date('2023-12-08').getTime(), end: new Date('2023-12-09').getTime() },
              { x: '2023-12-03', y: new Date('2023-12-07').getTime(), end: new Date('2023-12-08').getTime() },
              { x: '2023-12-05', y: new Date('2023-12-07').getTime(), end: new Date('2023-12-08').getTime() }
            ],
            backgroundColor: [
              'rgba(255, 26, 104, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(0, 0, 0, 0.5)'
            ],
            borderColor: [
              'rgba(255, 26, 104, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM dd' // Format for displaying dates
                }
              },
              ticks: {
                source: 'auto' // Automatically determine tick spacing
              }
            },
            y: {
              stacked: true // Bars start at different positions
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (myChart) {
        myChart.destroy(); // Destroy the chart instance when the component unmounts
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default GanttChart;
