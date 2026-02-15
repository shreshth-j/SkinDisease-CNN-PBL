const ctx = document.getElementById('chart');

new Chart(ctx, {
type: 'bar',
data: {
labels: ['Baseline', 'CNN Model'],
datasets: [{
data: [20, 46],
backgroundColor: ['#333', '#3b82f6']
}]
},
options:{
plugins:{legend:{display:false}},
scales:{y:{beginAtZero:true}}
}
});
