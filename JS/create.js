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
document.getElementById('schedule-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('schedule-id').value;
    const routeId = document.getElementById('route-id').value;
    const busId = document.getElementById('bus-id').value;
    const departureTime = document.getElementById('departure-time').value;
    const arrivalTime = document.getElementById('arrival-time').value;
    const day = document.getElementById('schedule-day').value;

    const schedules = loadData('schedules');
    schedules.push({ id, routeId, busId, departureTime, arrivalTime, day });
    saveData('schedules', schedules);
    displaySchedules();
    e.target.reset();
});