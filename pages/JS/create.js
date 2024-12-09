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