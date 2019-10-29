export default function formatItemsToHighCharts(items) {
  return Object.keys(items).map(item => ({
    // log: console.log(items[item]),
    x: Number(items[item].x),
    y: Number(items[item].y),
    className: items[item].range_inequality,
    id: Number(items[item].city.id),
    city: items[item].city.name,
    state: items[item].state.uf,
    state_id: items[item].state.id,
    region: items[item].region.id,
    is_big_town: items[item].city.is_big_town,
    is_capital: items[item].city.is_capital,
  }));
}
