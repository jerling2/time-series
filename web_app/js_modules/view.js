function getIdFromUrl() {
    const url = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const filename = url.substring(url.lastIndexOf('/')+1);
    
    if (filename == "view-time-series.html") {
        query = urlParams.get('ts_id');
    }
    else {
        query = urlParams.get('user_id');
    }
    return query;
  }

const id = decodeURIComponent(getIdFromUrl());

function viewUser() {
    fetch(`https://35.85.29.142:3000/view/users?user_id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((user_res) => {
        displayUser(user_res);
    });
}
  
function viewTimeSeries() {
    fetch(`https://35.85.29.142:3000/view/timeseries?ts_id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((timeseries_res) => {
        displayTsMetadata(timeseries_res);
    });
}

function displayUser(result) {
    const user_vals = result[0][0];
    const ts_metadata = result[1];
    const username = document.getElementById('username');
    username.innerHTML = user_vals.username;

    const tableBody = document.getElementById('ts-metadata-table-body');
    tableBody.innerHTML = '';

    if (ts_metadata < 1) {
        const row = document.createElement('tr');
        const NoResCell = document.createElement('td');
        NoResCell.className = "noRes";
        NoResCell.textContent = 'No Results';
        row.appendChild(NoResCell);
        tableBody.appendChild(row);
    }

    else {
        ts_metadata.forEach((ts) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            const idLink = document.createElement('a');
            idLink.textContent = ts.ts_id;
            idLink.href = `view-time-series.html?ts_id=${ts.ts_id}`;
            idCell.appendChild(idLink);
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = ts.ts_name;
            row.appendChild(nameCell);

            const descCell = document.createElement('td');
            descCell.textContent = ts.ts_desc;
            row.appendChild(descCell);

            const domainCell = document.createElement('td');
            domainCell.textContent = ts.ts_domain.replaceAll(",", ", ");
            row.appendChild(domainCell);

            const unitCell = document.createElement('td');
            unitCell.textContent = ts.ts_units;
            row.appendChild(unitCell);

            const keywordCell = document.createElement('td');
            keywordCell.textContent = ts.ts_keywords;
            row.appendChild(keywordCell);

            tableBody.appendChild(row);
        });
    }
}
  
function displayTsMetadata(ts_metadata) {
    const ts_vals = ts_metadata[0];
    const ts_name = document.getElementById('ts_name');
    const ts_desc = document.getElementById('ts_desc');
    const ts_domain = document.getElementById('ts_domain');
    const ts_units = document.getElementById('ts_units');
    const ts_keywords = document.getElementById('ts_keywords');
    const ts_contributor = document.getElementById('ts_contributor');
    ts_name.innerHTML = ts_vals.ts_name;
    ts_desc.innerHTML = ts_vals.ts_desc;
    ts_domain.innerHTML = ts_vals.ts_domain.replaceAll(",", ", ");
    ts_units.innerHTML = ts_vals.ts_units;
    ts_keywords.innerHTML = ts_vals.ts_keywords;
    
    // Will change this to username.
    // Need to change query to join with users table to retrieve username.
    ts_contributor.innerHTML = ts_vals.ts_contributor;

}