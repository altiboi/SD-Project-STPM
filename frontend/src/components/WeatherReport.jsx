import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import './WeatherReport.css';

const WeatherReport = ({ dailyTemperatures }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState('last1Month');

    useEffect(() => {
        if (dailyTemperatures) {
            const filteredTemperatures = filterTemperaturesByDateRange(dailyTemperatures, selectedDateRange);
            const data = processData(filteredTemperatures, selectedDateRange);
            setChartData(data);
        }
    }, [dailyTemperatures, selectedDateRange]);

    const filterTemperaturesByDateRange = (temperatures, dateRange) => {
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
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
                break;
            default:
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        }

        return temperatures.filter(temperature => new Date(temperature.date) >= startDate);
    };

    const processData = (temperatures, dateRange) => {
        const data = {
            labels: [],
            datasets: [{
                label: 'Average Temperature (°C)',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        // Determine the grouping interval based on the selected date range
        let interval;
        switch (dateRange) {
            case 'last1Week':
            case 'last2Weeks':
                interval = 'daily';
                break;
            case 'last1Month':
                interval = 'weekly';
                break;
            case 'last3Months':
            case 'last6Months':
                interval = 'monthly';
                break;
            default:
                interval = 'daily';
        }

        const groupedData = groupTemperaturesByTimeInterval(temperatures, interval);

        for (const key in groupedData) {
            if (groupedData.hasOwnProperty(key)) {
                const avgTemp = calculateAverageTemperature(groupedData[key]);
                data.labels.push(key);
                data.datasets[0].data.push(avgTemp);
            }
        }

        return data;
    };

    const groupTemperaturesByTimeInterval = (temperatures, interval) => {
        const groupedData = {};

        temperatures.forEach(temperature => {
            const date = new Date(temperature.date);
            let key;

            switch (interval) {
                case 'daily':
                    key = date.toISOString().split('T')[0];
                    break;
                case 'weekly':
                    key = `Week ${getWeek(date)} of ${date.getFullYear()}`;
                    break;
                case 'monthly':
                    key = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
                    break;
                default:
                    break;
            }

            if (!groupedData[key]) {
                groupedData[key] = [];
            }

            groupedData[key].push(temperature.avgTempC);
        });

        return groupedData;
    };

    const calculateAverageTemperature = (values) => {
        const sum = values.reduce((acc, curr) => acc + curr, 0);
        return sum / values.length;
    };

    const getWeek = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const handleDateRangeChange = (event) => {
        setSelectedDateRange(event.target.value);
    };

    const generatePDFReport = () => {
        if (!chartData) {
            return;
        }

        const pdf = new jsPDF();
        pdf.text(20, 20, `Weather Report:`);
        pdf.text(20, 30, `Date Range: ${selectedDateRange}`);

        const chartCanvas = document.getElementById('weather-chart');
        if (chartCanvas) {
            const chartDataURL = chartCanvas.toDataURL('image/png');
            pdf.addImage(chartDataURL, 'PNG', 10, 40, 180, 100);
            pdf.save('weather_report.pdf');
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
                {chartData && <Line id="weather-chart" data={chartData} ref={chartRef} />}
            </div>
            <button className="download-btn" onClick={generatePDFReport}>
                Download Report
            </button>
        </div>
    );
};

export default WeatherReport;