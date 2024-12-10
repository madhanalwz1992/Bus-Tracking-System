const deleteBus = (index) => {
    const buses = loadData('buses');
    buses.splice(index, 1);
    saveData('buses', buses);
    displayBuses();
};
const deleteRoute = (index) => {
    const routes = loadData('routes');
    routes.splice(index, 1);
    saveData('routes', routes);
    displayRoutes();
};
const deleteSchedule = (index) => {
    const schedules = loadData('schedules');
    schedules.splice(index, 1);
    saveData('schedules', schedules);
    displaySchedules();
};