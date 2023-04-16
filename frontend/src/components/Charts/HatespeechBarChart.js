import React from "react";
import {Bar} from 'react-chartjs-2';

const HatespeechBarChart = (props) =>{
    var acceptable = props.hatespeechCounter.acceptable;
    var inappropriate = props.hatespeechCounter.inappropriate;
    var offensive = props.hatespeechCounter.offensive;
    var violent = props.hatespeechCounter.violent;
    return(
        <div>
          
            <Bar

data= {{
    labels: ['acceptable','inappropriate', 'offensive','violent'],
    datasets: [{
        label: 'hate_speech_level',

        data: [acceptable, inappropriate, offensive, violent],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',           
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)'
            
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',            
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)'
            
        ],
        borderWidth: 1
    }]
 }}
	 
	width={100}
	height={400}
	options={{ maintainAspectRatio: false }}
            />
        </div>
    )

    
}



export default HatespeechBarChart