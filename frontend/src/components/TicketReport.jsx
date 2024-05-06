import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line, Chart } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import './TicketReport.css'

// Component for generating and displaying reports
const TicketReport = ({ tickets }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState('last1Month');

    const options = {
        scales: {
          x: {
            type: 'category', // Specify scale type as 'category'
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
            title: {
                display: true,
                text: 'Ticket Status Report',
            },
        }
      };

    useEffect(() => {
        if (tickets) {
          const filteredTickets = filterTicketsByDateRange(tickets, selectedDateRange);
          const openTickets = filteredTickets.filter(ticket => ticket.status === 'open').length;
          const inProgressTickets = filteredTickets.filter(ticket => ticket.status === 'assigned').length;
          const closedTickets = filteredTickets.filter(ticket => ticket.status === 'closed').length;
    
          const data = {
            labels: ['Open', 'In Progress', 'Closed'],
            datasets: [{
              label: 'Ticket Status',
              data: [openTickets, inProgressTickets, closedTickets],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Red for open tickets
                'rgba(54, 162, 235, 0.2)', // Blue for in progress tickets
                'rgba(75, 192, 192, 0.2)', // Green for closed tickets
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            }]
          };
    
          setChartData(data);
        }
      }, [tickets, selectedDateRange]);

    const filterTicketsByDateRange = (tickets, dateRange) => {
        const currentDate = new Date();
        let startDate;
      
        switch (dateRange) {
            case 'last1Week':
              startDate = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
              break;
            case 'last2Weeks':
              startDate = new Date(currentDate.getTime() - (14 * 24 * 60 * 60 * 1000));
              break;
            case 'last1Month':
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
              break;
            case 'last3Months':
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
              break;
            case 'last6Months':
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);
              break;
            default:
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          }
        
        return tickets.filter(ticket => new Date(ticket.rawDateOpened) >= startDate);
    };
    
    const handleDateRangeChange = (event) => {
        setSelectedDateRange(event.target.value);
    };
      
  const generatePDFReport = () => {
    if (!chartData) {
        return;
    }

    // Create new jsPDF instance
    const pdf = new jsPDF();

    pdf.text(20, 20, `User Info:`);
    pdf.text(20, 30, `Name: Sims`);
    pdf.text(20, 40, `Email: sims`);

    // Convert chart data to image URL
    const canvas = document.createElement('canvas');
    canvas.width = 300; // Set canvas dimensions as needed
    canvas.height = 200;
    const chartElement = document.getElementById('ticket-chart');
    if (chartElement) {
        const chartCanvas = document.getElementById('ticket-chart');
        const chartDataURL = chartCanvas.toDataURL('image/png');

        // Add chart image to PDF document
        pdf.addImage(chartDataURL, 'PNG', 10, 50, 180, 100); // Adjust position and dimensions as needed

        // Save or download the PDF document
        pdf.save('report.pdf');
    }else{
        console.log("Not found")
    }
  };

  // Render the reporting component
  return (
    <div className="container">
      <div className="graph-container">
      <label htmlFor="dateRange">Select Date Range: </label>
        <select className="dateRange" onChange={handleDateRangeChange}>
          <option value="last1Week">Past Week</option>
          <option value="last2Weeks">Past 2 Weeks</option>
          <option value="last1Month">Past Month</option>
          <option value="last3Months">Past 3 Months</option>
          <option value="last6Months">Past 6 Months</option>
        </select>
        {chartData && <Bar id="ticket-chart" data={chartData} options={options}/>}
      </div>
      <button className="download-btn" onClick={generatePDFReport}>
        Download Report
      </button>
    </div>
  );
};

export default TicketReport;
