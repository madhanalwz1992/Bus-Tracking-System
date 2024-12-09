document.getElementById('bus-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('bus-id').value;
    const name = document.getElementById('bus-name').value;
    const location = document.getElementById('bus-location').value;
    const status = document.getElementById('bus-status').value;

    const buses = loadData('buses');
    buses.push({ id, name, location, status });
    saveData('buses', buses);
    displayBuses();
    e.target.reset();
});
document.getElementById('route-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('route-id').value;
    const name = document.getElementById('route-name').value;
    const stops = document.getElementById('route-stops').value.split(',');
    const distance = document.getElementById('route-distance').value;

    const routes = loadData('routes');
    routes.push({ id, name, stops, distance });
    saveData('routes', routes);
    displayRoutes();
    e.target.reset();
});