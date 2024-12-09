const fetchData = async (file) => {
    try {
        const response = await fetch(`../data/${file}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${file}:`, error);
        return [];
    }
};
const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

