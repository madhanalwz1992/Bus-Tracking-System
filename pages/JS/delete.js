const deleteBus = (index) => {
    const buses = loadData('buses');
    buses.splice(index, 1);
    saveData('buses', buses);
    displayBuses();
};
