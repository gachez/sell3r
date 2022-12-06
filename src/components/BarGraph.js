import React, { Component } from 'react';
import CanvasJSReact from '../vendor/assets/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarGraph extends Component {
	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Views and sells"
			},
            
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 58, label: "Views" },
					{ y: 42, label: "Orders" }
				]
			}]
		}
		return (
		<div style={{fontFamily: 'Fira sans'}}>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart 
            instance as shown above using onRef. 
            This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default BarGraph  