const displayBuses = () => {
    const buses = loadData('buses');
    const busList = document.getElementById('bus-list');
    busList.innerHTML = buses
        .map(
            (bus, index) => `
            <tr>
                <td>${bus.id}</td>
                <td>${bus.name}</td>
                <td>${bus.location}</td>
                <td>${bus.status}</td>
                <td>
                    <button onclick="editBus(${index})">Edit</button>
                    <button onclick="deleteBus(${index})">Delete</button>
                </td>
            </tr>`
        )
        .join('');
};