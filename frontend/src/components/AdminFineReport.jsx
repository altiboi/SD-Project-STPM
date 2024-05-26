import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import './FineReport.css';

const AdminFineReport = ({ fines }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState('last1Month');

  useEffect(() => {
    if (fines) {
      let paidTotal = 0;
      let unpaidTotal = 0;
      const filteredFines = filterFinesByDateRange(fines, selectedDateRange);

      filteredFines.forEach(user => {
        user.Fines.forEach(fine => {
          if (fine.status === 'Paid') {
            paidTotal += fine.fine_amount;
          } else if (fine.status === 'Unpaid') {
            unpaidTotal += fine.fine_amount;
          }
        });
      });

      const data = {
        labels: ['Paid', 'Unpaid'],
        datasets: [{
          label: 'Fine Status',
          data: [paidTotal, unpaidTotal],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        }]
      };

      setChartData(data);
    }
  }, [fines, selectedDateRange]);

  const filterFinesByDateRange = (fines, dateRange) => {
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

    return fines.map(user => ({
      ...user,
      Fines: user.Fines.filter(fine => new Date(fine.date_issued) >= startDate)
    }));
  };

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const generatePDFReport = () => {
    if (!chartData) {
      return;
    }

    const pdf = new jsPDF();

    pdf.text(20, 20, `Admin Fine Report:`);
    // Add more admin-specific information as needed

    const chartCanvas = document.getElementById('fine-chart');
    if (chartCanvas) {
      const chartDataURL = chartCanvas.toDataURL('image/png');
      pdf.addImage(chartDataURL, 'PNG', 10, 50, 180, 100);
      pdf.save('fine_report.pdf');
    } else {
      console.log("Chart canvas not found");
    }
  };

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
        {chartData && <Bar id="fine-chart" data={chartData} />}
      </div>
      <button className="download-btn" onClick={generatePDFReport}>
        Download Report
      </button>
    </div>
  );
};

export default AdminFineReport;