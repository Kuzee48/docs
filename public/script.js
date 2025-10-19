// File: /public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const apiContainer = document.getElementById('api-container');

    // Fungsi untuk merender semua endpoint dari file konfigurasi
    function renderEndpoints() {
        apiContainer.innerHTML = ''; // Kosongkan container

        apiCategories.forEach(category => {
            // Buat elemen untuk kategori
            const categoryDetails = document.createElement('details');
            categoryDetails.className = 'api-category';
            categoryDetails.open = true; // Buka semua kategori secara default

            const categorySummary = document.createElement('summary');
            categorySummary.textContent = `${category.category} (${category.endpoints.length})`;
            categoryDetails.appendChild(categorySummary);

            // Loop melalui setiap endpoint dalam kategori
            category.endpoints.forEach(endpoint => {
                const endpointWrapper = document.createElement('details');
                endpointWrapper.className = 'endpoint';

                const summary = document.createElement('summary');
                summary.className = 'endpoint-summary';
                summary.innerHTML = `
                    <span class="method">${endpoint.method}</span>
                    <span class="path">${endpoint.path}</span>
                    <span class="status">${endpoint.status}</span>
                `;
                
                const details = document.createElement('div');
                details.className = 'endpoint-details';
                
                let paramsHtml = '<p><strong>Parameters</strong></p>';
                endpoint.parameters.forEach(param => {
                    paramsHtml += `
                        <div class="param-input">
                            <label for="${endpoint.path}-${param.name}">${param.name} ${param.required ? '*' : ''}</label>
                            <input type="${param.type}" id="${endpoint.path}-${param.name}" name="${param.name}" placeholder="${param.placeholder || ''}" ${param.required ? 'required' : ''}>
                        </div>
                    `;
                });

                details.innerHTML = `
                    <p>${endpoint.description}</p>
                    <div class="try-it-out">
                        <h4>TRY IT OUT</h4>
                        <form class="endpoint-form">
                            ${paramsHtml}
                            <button type="submit" class="execute-btn">Execute</button>
                        </form>
                        <div class="response-box" style="display: none;">
                            <pre><code></code></pre>
                        </div>
                    </div>
                `;

                endpointWrapper.appendChild(summary);
                endpointWrapper.appendChild(details);
                categoryDetails.appendChild(endpointWrapper);
            });

            apiContainer.appendChild(categoryDetails);
        });

        // Tambahkan event listener setelah semua elemen dibuat
        addFormEventListeners();
    }

    // Fungsi untuk menambahkan event listener ke semua form 'Execute'
    function addFormEventListeners() {
        document.querySelectorAll('.endpoint-form').forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const responseBox = form.nextElementSibling;
                const codeElement = responseBox.querySelector('code');
                
                responseBox.style.display = 'block';
                codeElement.textContent = 'Loading...';

                const formData = new FormData(form);
                const params = new URLSearchParams();
                for (const pair of formData.entries()) {
                    params.append(pair[0], pair[1]);
                }

                // Dapatkan path API dari elemen parent
                const endpointPath = form.closest('.endpoint').querySelector('.path').textContent;
                const requestUrl = `${endpointPath}?${params.toString()}`;
                
                try {
                    const response = await fetch(requestUrl);
                    const data = await response.json();
                    codeElement.textContent = JSON.stringify(data, null, 2);
                } catch (error) {
                    codeElement.textContent = `Error: ${error.message}`;
                }
            });
        });
    }

    // Panggil fungsi render saat halaman dimuat
    renderEndpoints();
});
