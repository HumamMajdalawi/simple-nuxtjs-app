<template>
<div class="container">
    <div>
        <div>
            <bar-chart :data="barChartData" :options="barChartOptions" :height="600" :width="600" />
        </div>

    </div>
</div>
</template>

<script>
export default {

    async asyncData({
        $axios
    }) {
      
        const tickers = await $axios.$get('/api/tickers/')
        const first20Ranks = tickers.data.map(t => t.rank).filter(r => r >= 1 && r <= 20)
        const chartData = tickers.data.filter(t => t.rank > 1 && t.rank < 20).map(t => t.market_cap_usd)
        const barChartData = {
            labels: first20Ranks,
            datasets: [{
                label: "market_cap_usd",
                data: chartData,
                backgroundColor: '#003f5c',
            }],
        }
        return {
            barChartData
        }

    },

    data() {
        return {
            barChartOptions: {
                responsive: true,
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Coinlore Tickers',
                    fontSize: 24,
                    fontColor: '#6b7280'
                },
                tooltips: {
                    backgroundColor: '#17BF62'
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }]
                }
            }
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family:
        'Quicksand',
        'Source Sans Pro',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
