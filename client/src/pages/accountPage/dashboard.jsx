import { Chart as ChartJS, ArcElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";
import { Line } from "react-chartjs-2";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(ArcElement, Filler, CategoryScale, Tooltip, Legend, LinearScale, PointElement, LineElement);

const greenGradient = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(50, 192, 100, 0.5)");
    gradient.addColorStop(0.5, "rgba(50, 192, 100, 0.3)");
    gradient.addColorStop(1, "rgba(50, 192, 100, 0)");
    return gradient;
}

const darkGradient = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(50, 50, 50, 0.5)");
    gradient.addColorStop(0.5, "rgba(50, 50, 50, 0.3)");
    gradient.addColorStop(1, "rgba(50, 50, 50, 0)");
    return gradient;
}

const testData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Weight',
            data: [10, 25, 30, 5, 80, 100, 12],
            fill: true,
            borderColor: 'rgb(50, 50, 50)',
            backgroundColor: darkGradient,
            pointRadius: 0,
            tension: 0.3
        },
        {
            label: 'BMI',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: 'rgb(50, 200, 100)',
            backgroundColor: greenGradient,
            pointRadius: 0,
            tension: 0.3
        },
        
    ]
}

const options = {
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            border: {
                dash: [10, 5],
            },
            grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1,
            },
            beginAtZero: true
        }
    }
}


const progressStyle = (color) => buildStyles({
    textSize: '25px',
    textColor: color,
    pathColor: color,
    trailColor: '#d6d6d6',
})

const dailyFullfilement = {
    "Carbs" : {
        value: 50,
        color: '#4ade80'
    },
    "Proteins" : {
        value: 75,
        color: '#0ea5e9'
    },
    "Fats" : {
        value: 25,
        color: '#ef4444'
    }
}

const callories = {
    value: 2000,
    total: 2500,
    color: '#f97316'
}


export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold">Weight change</h2>
                <p><span className="mb-5 text-green-400">(+5 kg) more</span> from last mounth</p>
                <Line data={testData} options={options} />
            </div>
            <div className="flex gap-4">
                <div className="w-2/3 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold">Daily nutrient fullfilment</h2>
                    <div className="flex h-48 gap-4 m-4">
                        {Object.keys(dailyFullfilement).map((key) => (
                            <div className="flex flex-col items-center gap-4 ">
                                <p className="mt-2 text-xl font-bold" style={{color:dailyFullfilement[key].color}}>{key}</p>
                                <CircularProgressbar value={dailyFullfilement[key].value} text={`${dailyFullfilement[key].value}%`} styles={progressStyle(dailyFullfilement[key].color)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/3 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold text-center">Callories</h2>
                    <div className="flex h-48 gap-4 m-4">
                        <CircularProgressbar value={callories.value} maxValue={callories.total} text={`${callories.value}`} styles={progressStyle(callories.color)} />
                    </div>
                </div>
            </div>
        </div>
    )
}