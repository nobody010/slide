document.addEventListener('DOMContentLoaded', () => {

    let side = 1;
    let slider = document.querySelector('#slider')
    let sec1 = document.querySelector('#section1')
    let sec2 = document.querySelector('#section2')
    let sec3 = document.querySelector('#section3')
    let breathe = document.querySelector('#title0')

    //slide btn clicked
    document.querySelector('#slideBtn').addEventListener('click', (e) => {
        if (side === 1) {
            slider.classList.remove('slideL')
            slider.classList.add('slideR')
            sec3.style.zIndex = '0'
            sec3.classList.remove('disappear')
            sec3.classList.add('appear')
            setTimeout(() => {
                sec1.classList.remove('appear')
                sec1.classList.add('disappear')
                breathe.classList.remove('disappearSlow')
                breathe.classList.add('appearSlow')
            }, 800)
            side = 2;
        } else {
            slider.classList.remove('slideR')
            slider.classList.add('slideL')
            sec3.style.zIndex = '0'
            setTimeout(() => {
                sec3.classList.remove('appear')
                sec3.classList.add('disappear')
            }, 800)
            setTimeout(() => {
                sec1.classList.remove('disappear')
                sec1.classList.add('appear')
                breathe.classList.remove('appearSlow')
                breathe.classList.add('disappear')
            }, 300)
            side = 1;
        }
    })

    //initializing chart
    var ctx = document.querySelector('#myChart').getContext('2d')
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['S', 'M', 'T', 'W', 'T', 'F'],
            datasets: [{
                label: '# of hours',
                data: [8, 9, 4, 8, 5, 3],
                backgroundColor: [
                    'rgba(95, 138, 255, 0.3)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(95, 138, 255, 0.3)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(95, 138, 255, 0.3)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(95, 138, 255, 0.3)',
                ],
                borderColor: [
                    'rgba(95, 138, 255, 1)', 
                    'rgba(255, 159, 64, 1)',
                    'rgba(95, 138, 255, 1)', 
                    'rgba(255, 159, 64, 1)',
                    'rgba(95, 138, 255, 1)', 
                    'rgba(255, 159, 64, 1)',
                    'rgba(95, 138, 255, 1)', 
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })

    //sleep data object
    let sleep = {
        weeklys: [5.8],
        currentWeekly: 6.2,
        currentDays: 6,
        currentSum: 37.0,
        sign: '+', 
        percentage: 6.9,
    }

    //add data function - updates chart and stats
    function addData(chart) {
        let data = document.querySelector('#data').value;
        if(chart.data.labels.length < 7 && data <=24 && data != '') {
            chart.data.labels.push(document.querySelector('#label').value)
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data)
            })
            chart.update()
            sleep.currentSum += parseFloat(data);
            sleep.currentDays++;
            sleep.currentWeekly = sleep.currentSum / sleep.currentDays;
            document.querySelector('#weeklyAvg').textContent = sleep.currentWeekly.toFixed(1);
            console.log(document.querySelector('#weeklyAvg'))
        }
    }
    //add data button
    document.querySelector('#addDataBtn').addEventListener('click', () => {
        addData(myChart)
    })

    //remove data function
    function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }
    //remove data button
    document.querySelector('#removeDataBtn').addEventListener('click', () => {
        removeData(myChart)
    })

    //save data function
    function saveData(chart) {
        chart.data.labels = [];
        chart.data.datasets.forEach((dataset => {
            dataset.data = [];
        }))
        chart.update()
    }
    //save data button
    document.querySelector('#saveBtn').addEventListener('click', () => {
        saveData(myChart)
        console.log('test')
    })

})