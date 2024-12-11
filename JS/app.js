const apiUrl = 'http://localhost:3000';

// Fetch and display buses
async function fetchBuses() {
    const response = await fetch(`${apiUrl}/buses`);
    const buses = await response.json();

    const tableBody = document.getElementById('busTableBody');
    tableBody.innerHTML = '';

    buses.forEach(bus => {
        const row = `
            <tr>
                <td>${bus.id}</td>
                <td>${bus.bus_number}</td>
                <td>${bus.capacity}</td>
                <td>${bus.current_location}</td>
                <td>
                    <button onclick="deleteBus(${bus.id})">Delete</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}
// Add a new bus
async function addBus(event) {
    event.preventDefault();

    const busNumber = document.getElementById('busNumber').value;
    const capacity = document.getElementById('capacity').value;
    const currentLocation = document.getElementById('currentLocation').value;

    await fetch(`${apiUrl}/buses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bus_number: busNumber, capacity, current_location: currentLocation }),
    });

    document.getElementById('bus-form').reset();
    fetchBuses();
}
// Delete a bus
async function deleteBus(id) {
    await fetch(`${apiUrl}/buses/${id}`, { method: 'DELETE' });
    fetchBuses();
}
// Fetch and display routes
async function fetchRoutes() {
    const response = await fetch(`${apiUrl}/routes`);
    const routes = await response.json();

    const tableBody = document.getElementById('routeTableBody');
    tableBody.innerHTML = '';

    routes.forEach(route => {
        const row = `
            <tr>
                <td>${route.id}</td>
                <td>${route.route_name}</td>
                <td>${route.start_location}</td>
                <td>${route.end_location}</td>
                <td>
                    <button onclick="deleteRoute(${route.id})">Delete</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}
// Add a new route
async function addRoute(event) {
    event.preventDefault();

    const routeName = document.getElementById('routeName').value;
    const startLocation = document.getElementById('startLocation').value;
    const endLocation = document.getElementById('endLocation').value;

    await fetch(`${apiUrl}/routes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route_name: routeName, start_location: startLocation, end_location: endLocation }),
    });

    document.getElementById('route-form').reset();
    fetchRoutes();
}
// Delete a route
async function deleteRoute(id) {
    await fetch(`${apiUrl}/routes/${id}`, { method: 'DELETE' });
    fetchRoutes();
}