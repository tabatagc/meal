document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('mealEntriesTable').querySelector('tbody');
    const addMealEntryButton = document.getElementById('addMealEntry');
    const showPublicOnlyCheckbox = document.getElementById('showPublicOnly');
    const aboutTabataButton = document.getElementById('aboutTabata');

    addMealEntryButton.onclick = () => {
        window.location.href = '/view/add-meal-entry-form';
    };

    aboutTabataButton.onclick = () => {
        window.location.href = '/view/tabata';
    };

    showPublicOnlyCheckbox.onchange = () => {
        loadMealEntries(showPublicOnlyCheckbox.checked);
    };

    function loadMealEntries(showPublicOnly = false) {
        const endpoint = showPublicOnly ? '/meal-entries/public' : '/meal-entries';
        fetch(endpoint)
            .then(response => response.json())
            .then(entries => {
                tableBody.innerHTML = ''; // Clear the table
                entries.forEach(entry => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${entry.userId}</td>
                        <td>${entry.description}</td>
                        <td>${new Date(entry.timestamp).toLocaleString()}</td>
                        <td>${entry.isPublic ? 'Yes' : 'No'}</td>
                        <td><button onclick="window.location.href='/view/update-meal-entry-form/${entry.id}'">Update</button></td>
                    `;
                    tableBody.appendChild(tr);
                });
            });
    }

    // Initial load
    loadMealEntries();
});
