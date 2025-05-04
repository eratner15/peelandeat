/**
 * Game Implementation: WOLF
 */

/**
 * Generate Wolf scorecard rows
 */
function generateWolfRows() {
    const tbody = document.getElementById('wolf-scorecard-body');
    if (!tbody || tbody.children.length > 0) return; // Already populated
    
    let html = '';
    
    for (let i = 1; i <= 18; i++) {
        // Determine wolf player for this hole (1-based index)
        const wolfPlayerIndex = ((i - 1) % 4) + 1;
        
        html += `
            <tr id="wolf-row-h${i}">
                <td class="td-std font-medium">${i}</td>
                <td class="td-std wolf-player" id="wolf-h${i}-wolf-player">P${wolfPlayerIndex}</td>
                <td class="td-std">
                    <select id="wolf-h${i}-selection" class="input-std" aria-label="Wolf Selection Hole ${i}">
                        <option value=""></option>
                        <option value="alone">Alone</option>
                        <option value="p1">Player 1</option>
                        <option value="p2">Player 2</option>
                        <option value="p3">Player 3</option>
                        <option value="p4">Player 4</option>
                    </select>
                </td>
                <td class="td-std"><input type="number" id="wolf-p1-h${i}-score" min="1" class="input-std input-score" aria-label="Player 1 Score Hole ${i}"></td>
                <td class="td-std"><input type="number" id="wolf-p2-h${i}-score" min="1" class="input-std input-score" aria-label="Player 2 Score Hole ${i}"></td>
                <td class="td-std"><input type="number" id="wolf-p3-h${i}-score" min="1" class="input-std input-score" aria-label="Player 3 Score Hole ${i}"></td>
                <td class="td-std"><input type="number" id="wolf-p4-h${i}-score" min="1" class="input-std input-score" aria-label="Player 4 Score Hole ${i}"></td>
                <td class="td-std p1-cell" id="wolf-h${i}-p1-pts"></td>
                <td class="td-std p2-cell" id="wolf-h${i}-p2-pts"></td>
                <td class="td-std p3-cell" id="wolf-h${i}-p3-pts"></td>
                <td class="td-std p4-cell" id="wolf-h${i}-p4-pts"></td>
            </tr>`;
        
        // Add summary rows
        if (i === 9) {
            html += `
                <tr class="bg-gray-100 font-semibold">
                    <td class="td-std" colspan="3">OUT</td>
                    <td class="td-std" id="wolf-p1-out-score"></td>
                    <td class="td-std" id="wolf-p2-out-score"></td>
                    <td class="td-std" id="wolf-p3-out-score"></td>
                    <td class="td-std" id="wolf-p4-out-score"></td>
                    <td class="td-std p1-cell" id="wolf-p1-out-pts"></td>
                    <td class="td-std p2-cell" id="wolf-p2-out-pts"></td>
                    <td class="td-std p3-cell" id="wolf-p3-out-pts"></td>
                    <td class="td-std p4-cell" id="wolf-p4-out-pts"></td>
                </tr>`;
        } else if (i === 18) {
            html += `
                <tr class="bg-gray-100 font-semibold">
                    <td class="td-std" colspan="3">IN</td>
                    <td class="td-std" id="wolf-p1-in-score"></td>
                    <td class="td-std" id="wolf-p2-in-score"></td>
                    <td class="td-std" id="wolf-p3-in-score"></td>
                    <td class="td-std" id="wolf-p4-in-score"></td>
                    <td class="td-std p1-cell" id="wolf-p1-in-pts"></td>
                    <td class="td-std p2-cell" id="wolf-p2-in-pts"></td>
                    <td class="td-std p3-cell" id="wolf-p3-in-pts"></td>
                    <td class="td-std p4-cell" id="wolf-p4-in-pts"></td>
                </tr>
                <tr class="bg-gray-200 font-bold">
                    <td class="td-std" colspan="3">TOTAL</td>
                    <td class="td-std" id="wolf-p1-total-score"></td>
                    <td class="td-std" id="wolf-p2-total-score"></td>
                    <td class="td-std" id="wolf-p3-total-score"></td>
                    <td class="td-std" id="wolf-p4-total-score"></td>
                    <td class="td-std p1-cell" id="wolf-p1-total-pts"></td>
                    <td class="td-std p2-cell" id="wolf-p2-total-pts"></td>
                    <td class="td-std p3-cell" id="wolf-p3-total-pts"></td>
                    <td class="td-std p4-cell" id="wolf-p4-total-pts"></td>
                </tr>`;
        }
    }
    
    if (tbody) tbody.innerHTML = html;
}

/**
 * Initialize Wolf: Add listeners for player name changes and event handlers
 */
function initializeWolf() {
    console.log("Initializing Wolf");
    
    // Update header names and wolf selection dropdowns when players change
    const playerInputs = [];
    const playerHeaders = [];
    
    for (let i = 1; i <= 4; i++) {
        playerInputs.push(document.getElementById(`wolf-p${i}-name`));
        playerHeaders.push(document.getElementById(`wolf-th-p${i}`));
    }
    
    const updateNames = () => {
        // Update column headers
        for (let i = 0; i < 4; i++) {
            const playerName = playerInputs[i]?.value || `P${i+1}`;
            if (playerHeaders[i]) {
                playerHeaders[i].textContent = playerName;
            }
        }
        
        // Update wolf player names in each row
        for (let hole = 1; hole <= 18; hole++) {
            const wolfPlayerIndex = ((hole - 1) % 4);
            const wolfCell = document.getElementById(`wolf-h${hole}-wolf-player`);
            if (wolfCell) {
                const wolfName = playerInputs[wolfPlayerIndex]?.value || `P${wolfPlayerIndex+1}`;
                wolfCell.textContent = wolfName;
            }
            
            // Update selection dropdown options
            const selectionDropdown = document.getElementById(`wolf-h${hole}-selection`);
            if (selectionDropdown) {
                const options = selectionDropdown.options;
                
                // Skip first option (empty or "Choose...")
                for (let i = 0; i < 4; i++) {
                    const playerName = playerInputs[i]?.value || `Player ${i+1}`;
                    const optIndex = i + 2; // +2 because first is empty, second is "Alone"
                    
                    if (options[optIndex]) {
                        options[optIndex].text = playerName;
                    }
                }
            }
        }
        
        // Update settlement display names
        updateWolfSettlement();
    };
    
    playerInputs.forEach(input => {
        if (input) input.addEventListener('input', updateNames);
    });
    
    // Add listeners for point value and multiplier
    document.getElementById('wolf-point-value')?.addEventListener('input', updateWolf);
    document.getElementById('wolf-lone-multiplier')?.addEventListener('input', updateWolf);
    
    // Generate rows if needed
    generateWolfRows();
    
    // Add event handlers to selection dropdowns (after generation)
    for (let i = 1; i <= 18; i++) {
        document.getElementById(`wolf-h${i}-selection`)?.addEventListener('change', function() {
            // Disable selecting the wolf player as partner
            const wolfPlayerIndex = ((i - 1) % 4) + 1;
            const selectedValue = this.value;
            
            if (selectedValue === `p${wolfPlayerIndex}`) {
                showAlert("Wolf player cannot select themselves as a partner", "warning");
                this.value = ""; // Reset selection
                return;
            }
            
            updateWolf();
        });
    }
}

/**
 * Reset Wolf Display: Clear calculated values in the UI
 */
function resetWolfDisplay() {
    console.log("Reset Wolf Display");
    
    // Reset wolf player names
    for (let i = 1; i <= 18; i++) {
        const wolfPlayerIndex = ((i - 1) % 4) + 1;
        document.getElementById(`wolf-h${i}-wolf-player`).textContent = `P${wolfPlayerIndex}`;
        document.getElementById(`wolf-h${i}-selection`).value = '';
        
        // Reset point cells
        for (let p = 1; p <= 4; p++) {
            document.getElementById(`wolf-h${i}-p${p}-pts`)?.textContent = '';
        }
    }
    
    // Reset summary fields
    for (let p = 1; p <= 4; p++) {
        document.getElementById(`wolf-p${p}-out-score`)?.textContent = '';
        document.getElementById(`wolf-p${p}-in-score`)?.textContent = '';
        document.getElementById(`wolf-p${p}-total-score`)?.textContent = '';
        document.getElementById(`wolf-p${p}-out-pts`)?.textContent = '';
        document.getElementById(`wolf-p${p}-in-pts`)?.textContent = '';
        document.getElementById(`wolf-p${p}-total-pts`)?.textContent = '';
    }
    
    // Reset headers
    for (let p = 1; p <= 4; p++) {
        document.getElementById(`wolf-th-p${p}`)?.textContent = `P${p}`;
    }
    
    // Reset settlement area
    for (let p = 1; p <= 4; p++)