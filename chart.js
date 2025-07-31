const ctx = document.getElementById('myChart');

let c = new Chart(ctx, {
  type: 'line',
  data: {
    // labels: ['Grass', 'Grassfresser', 'Fleischfresser', 'Drachen'],
    datasets: [{
      label: 'Grass',
      data: [],
      borderWidth: 1
    }
        // {
        //     label: 'Grassfresser',
        //     data: [10, 20, 30, 40],
        //     borderWidth: 1
        //   }
]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        type: "logarithmic"
      }
    }
  }
});

