import React from "react";
import {Radar} from 'react-chartjs-2';

const HatespeechRadarChart = (props) =>{
  var acceptable = props.hatespeechCounter.acceptable;
  var inappropriate = props.hatespeechCounter.inappropriate;
  var offensive = props.hatespeechCounter.offensive;
  var violent = props.hatespeechCounter.violent;
    return(
        <div>
            <Radar
	data= {{
    labels: [
      'acceptable',
      'inappropriate',
      'offensive',
      'violent',

    ],
    datasets: [{
      label: 'hate_speech_level',
      data: [acceptable,inappropriate, offensive, violent],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  }}
	width={100}
	height={400}
	options={{ maintainAspectRatio: false }}
            />
        </div>
    )
}

export default HatespeechRadarChart