function loadawattargraph() {
	if ( awattaraktiv == 1) {
		var lineAwattarData = {
			labels: awattartime,
			datasets: [{
				label: 'Awattar Preis Cent/kWh',
				borderColor: "rgba(0, 0, 255, 0.7)",
				backgroundColor: "rgba(0, 0, 255, 0.7)",
				borderWidth: 1,
				fill: false,
				data: graphawattarprice,
				yAxisID: 'y-axis-1',
			} ]
		}

		var ctxa = document.getElementById('awattarcanvas').getContext('2d');

		window.AwattarLine = new Chart.Line(ctxa, {
			data: lineAwattarData,
			options: {
				tooltips: {
					enabled: false
				},
				elements: {
					point: {
						radius: 1
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				hover: {
					mode: 'null'
				},
				stacked: false,
				legend: {
					display: false
				},
				title: {
					display: false
				},
				scales: {
					xAxes: [
						{
						ticks: {
								// middle grey, opacy = 100% (visible)
								fontColor: "rgba(153, 153, 153, 1)"
						}
					}],
					yAxes: [
						{
							// horizontal line for values displayed on the left side (power)
							position: 'left',
							id: 'y-axis-1',
							type: 'linear',
							display: true,
							scaleLabel: {
							display: true,
							labelString: 'Preis Cent/kWh',
								// middle grey, opacy = 100% (visible)
								fontColor: "rgba(153, 153, 153, 1)"
						},
							gridLines: {
								// light grey, opacy = 100% (visible)
								color: "rgba(204, 204, 204, 1)",
							},
							ticks: {
								// middle grey, opacy = 100% (visible)
								fontColor: "rgba(153, 153, 153, 1)"
							}

						}]
				}
			}
		});
		$('#awattardiv').show();
	} 

}  // end loadgraph

