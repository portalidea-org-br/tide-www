export default {
  el: '#last-days-chart-insertion-point',
  template: '#last-days-chart',
  name: 'last-days-chart',
  data() {
    return {
      total_donations_amount: 0,
      last_seven_days_amount: 0,
      total_donations_count: 0,
      last_seven_days_count: 0,
      loading: true,
      debug: true,
      error: null,
      xhr_request: [],
    };
  },
  created() {},
  mounted() {
    console.log('mounted');
  },
};
