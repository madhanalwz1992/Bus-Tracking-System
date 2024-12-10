const editBus = (index) => {
    const buses = loadData('buses');
    const bus = buses[index];
    document.getElementById('bus-id').value = bus.id;
    document.getElementById('bus-name').value = bus.name;
    document.getElementById('bus-location').value = bus.location;
    document.getElementById('bus-status').value = bus.status;

    buses.splice(index, 1);
    saveData('buses', buses);
    displayBuses();
};
