import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import './FineReport.css';

const FineReport = ({ fines }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (fines) {
            let paidTotal = 0;
            let unpaidTotal = 0;

            fines.forEach(fine => {
                if (fine.status === 'Paid') {
                    paidTotal += fine.fine_amount;
                } else if (fine.status === 'Unpaid') {
                    unpaidTotal += fine.fine_amount;
                }
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
    }, [fines]);

    const generatePDFReport = () => {
        if (!chartData) {
            return;
        }

        const pdf = new jsPDF();

        pdf.text(20, 20, `User Info:`);
        pdf.text(20, 30, `Name: Sims`);
        pdf.text(20, 40, `Email: sims`);

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
                {chartData && <Bar id="fine-chart" data={chartData} />}
            </div>
            <button className="download-btn" onClick={generatePDFReport}>
                Download Report
            </button>
        </div>
    );
};

export default FineReport;
