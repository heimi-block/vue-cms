import { Line } from 'vue-chartjs'
// import the component - chart you need
import { mapState, mapMutations, mapActions } from 'vuex'
export default Line.extend({
  data () {
    return {

    }
  },
  created () {
    this.getGoogleAnalytics()
  },
  methods: {
    ...mapActions(['getGoogleAnalytics']),
    ...mapMutations(['SET_GOOGLE_ANALYTICS'])
  },
  computed: {
    ...mapState(['googleAnalytics'])
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: JSON.parse(window.localStorage.getItem('tags')),
      datasets: [
        {
          borderColor: 'rgba(87, 100, 198, 0.81)',
          backgroundColor: 'rgba(199, 199, 199, 0.1)',
          label: 'Users',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: JSON.parse(window.localStorage.getItem('users'))
        },
        {
          borderColor: 'rgba(80, 96, 218, 0.81)',
          backgroundColor: 'rgba(199, 199, 199, 0.1)',
          label: 'Sessions',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: JSON.parse(window.localStorage.getItem('sessions'))
        },
        {
          borderColor: '#5764c6',
          backgroundColor: 'rgba(199, 199, 199, 0.1)',
          label: 'Pageviews',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: JSON.parse(window.localStorage.getItem('pageviews'))
        }
      ]
    },
      {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1
      })
  }
})

