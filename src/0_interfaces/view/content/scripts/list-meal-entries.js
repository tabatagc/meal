/*0_interfaces/view/content/scripts/listMealEntries.js*/
document.addEventListener('DOMContentLoaded', function() {
    const addMealEntryButton = document.getElementById('addMealEntry');
    const showPublicOnlyCheckbox = document.getElementById('showPublicOnly');
    const aboutTabataButton = document.getElementById('aboutTabata');
    const mealEntriesTableBody = document.getElementById('mealEntriesTable').getElementsByTagName('tbody')[0];


    function loadMealEntries(showPublicOnly) {
        const url = showPublicOnly ? '../../meal-entries/public' : '../../meal-entries';
        fetch(url)
            .then(response => response.json())
            .then(mealEntries => {
                mealEntriesTableBody.innerHTML = ''; 
                mealEntries.forEach(entry => {
                    const row = mealEntriesTableBody.insertRow();
                    row.innerHTML = `
                    <td>${entry.userId}</td>
                    <td>${entry.description}</td>
                    <td>${new Date(entry.timestamp).toLocaleString()}</td>
                    <td>${entry.isPublic ? 'Yes' : 'No'}</td>
                    <td><a href="/update-meal-entry-form/${entry.id}" class="update-btn">Update</a></td>
                `;
                });
            });
    }

    loadMealEntries(false);

    showPublicOnlyCheckbox.addEventListener('change', () => {
        loadMealEntries(showPublicOnlyCheckbox.checked);
    });

    addMealEntryButton.addEventListener('click', () => {
        window.location.href = '../../add-meal-entry-form';
    });

    aboutTabataButton.addEventListener('click', () => {
        window.location.href = '../../tabata';
    });
});
