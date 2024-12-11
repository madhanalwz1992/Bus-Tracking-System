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