import React,{useState,useEffect} from 'react';
import url from '../../constants';
import Axios from 'axios';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart= ({responceData,country})=>{


    const [dailyData, setdailyData]  = useState([]);

    useEffect(()=>{
            Axios.get(`${url}/daily`)
            .then(({data})=>{

                const modifiedData = data.map((data)=>({
                    confirmed : data.confirmed.total,
                    deaths : data.deaths.total,
                    date : data.reportDate,
                  }));

                setdailyData(modifiedData);
                //console.log(modifiedData);
            }); 
    },[]);

    const LineChart = (
        dailyData.length 
        ? (
            <Line data= {{
                labels : dailyData.map(({date})=> date),
                datasets: [{
                    data: dailyData.map(({confirmed})=> confirmed),
                    label: 'Infected',
                    borderColor: "#3333ff",
                    fill:true,
                },{
                    data: dailyData.map(({deaths})=> deaths),
                    label: "Deaths",
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill:true,
                }],
            }}/>
        ):null
    );

    const BarChart = (
        responceData.confirmed
        ?(
            <Bar data={{
                labels: ['Total Infected','Currently Active','Recovered','Deaths'],
                datasets: [{
                    label:'People',
                    backgroundColor: [
                            'rgba(0, 0, 250, 0.5)',
                            'rgba(250, 246, 1, 0.5)',
                            'rgba(0, 250, 0, 0.5)',
                            'rgba(250, 0, 0, 0.5)',
                    ],
                    data: [ responceData.confirmed.value, responceData.confirmed.value - responceData.recovered.value - responceData.deaths.value ,responceData.recovered.value, responceData.deaths.value],
                }]

            }}
            options = {{ legend: false , title: {display:true,text:`Current State of ${country}`}}}
            />
        ):null
    );

    return (
        <div className={styles.container} >
           {country? BarChart: LineChart}
        </div>
        )
}

export default Chart;