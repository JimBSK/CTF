import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  plugins
} from 'chart.js';
import { Bar, Pie, getElementAtEvent } from 'react-chartjs-2';
import { Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Общие настройки для всех графиков
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14
        },
        padding: 20
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleFont: { size: 16 },
      bodyFont: { size: 14 },
      padding: 12,
      usePointStyle: true,
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || '';
          if (label) label += ': ';
          label += context.raw.toLocaleString();
          return label;
        }
      }
    }
  },
  animation: {
    duration: 2000,
    easing: 'easeInOutQuad'
  }
};

export const BarChart = ({ data, title }) => {
  const chartRef = useRef();

  const handleClick = (event) => {
    const element = getElementAtEvent(chartRef.current, event);
    if (element.length > 0) {
      const { datasetIndex, index } = element[0];
      console.log('Clicked:', data[index]);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `${title || 'chart'}.png`;
    link.href = chartRef.current.toBase64Image('image/png', 1);
    link.click();
  };

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      <Bar
        ref={chartRef}
        data={{
          labels: data?.map(item => item.date) || [],
          datasets: [{
            label: title || 'Данные',
            data: data?.map(item => item.count) || [],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.9)'
          }]
        }}
        options={{
          ...commonOptions,
          plugins: {
            ...commonOptions.plugins,
            title: {
              display: !!title,
              text: title,
              font: {
                size: 18
              },
              padding: {
                bottom: 30
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }}
        onClick={handleClick}
      />
      <Space style={{ position: 'absolute', top: 10, right: 10 }}>
        <Button 
          icon={<DownloadOutlined />} 
          onClick={handleDownload}
          size="small"
        />
      </Space>
    </div>
  );
};

export const PieChart = ({ data, title }) => {
  const chartRef = useRef();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `${title || 'pie-chart'}.png`;
    link.href = chartRef.current.toBase64Image('image/png', 1);
    link.click();
  };

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      <Pie
        ref={chartRef}
        data={{
          labels: data?.map(item => item.category) || [],
          datasets: [{
            data: data?.map(item => item.count) || [],
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', 
              '#4BC0C0', '#9966FF', '#FF9F40',
              '#8AC24A', '#FF5722', '#607D8B'
            ],
            borderWidth: 1,
            hoverOffset: 15
          }]
        }}
        options={{
          ...commonOptions,
          plugins: {
            ...commonOptions.plugins,
            title: {
              display: !!title,
              text: title,
              font: {
                size: 18
              },
              padding: {
                bottom: 30
              }
            },
            legend: {
              ...commonOptions.plugins.legend,
              onClick: (e, legendItem, legend) => {
                // Кастомный обработчик клика по легенде
                const index = legendItem.datasetIndex;
                const ci = legend.chart;
                ci.setDatasetVisibility(
                  index,
                  !ci.isDatasetVisible(index)
                );
                ci.update();
              }
            }
          }
        }}
      />
      <Space style={{ position: 'absolute', top: 10, right: 10 }}>
        <Button 
          icon={<DownloadOutlined />} 
          onClick={handleDownload}
          size="small"
        />
      </Space>
    </div>
  );
};