document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const todayMain = document.getElementById('todayMain');
    const modalNutrients = document.getElementById('modalNutrients');
    const closeNutrientsBtn = document.getElementById('closeNutrients');

    const navAdd = document.getElementById('navAdd');
    const addMealModal = document.getElementById('addMeal');
    const closeAddMealBtn = document.getElementById('closeAddMeal');
    const addMealForm = document.getElementById('addMealForm');

    // Stats Elements
    const navStats = document.getElementById('navStats');
    const statsContainer = document.getElementById('statsContainer');
    const closeStatsBtn = document.getElementById('closeStats');
    const tabBtns = document.querySelectorAll('.tabBtn');

    // Workout Elements
    const navWorkout = document.getElementById('navWorkout');
    const workoutContainer = document.getElementById('workoutContainer');
    const closeWorkoutBtn = document.getElementById('closeWorkout');
    const workoutForm = document.getElementById('workoutForm');

    // Search Elements
    const foodSearch = document.getElementById('foodSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const foodListContainer = document.getElementById('foodList');
    const selectedFoodInput = document.getElementById('selectedFood');

    // Stepper Elements
    const qtyDec = document.getElementById('qtyDec');
    const qtyInc = document.getElementById('qtyInc');
    const foodQuantity = document.getElementById('foodQuantity');

    // Nutrition Info Elements
    const infoCal = document.getElementById('infoCal');
    const infoPro = document.getElementById('infoPro');
    const infoCarb = document.getElementById('infoCarb');
    const infoFat = document.getElementById('infoFat');

    // --- Mock Data (Ideally fetched from backend) ---
    // Format: name: [calories, protein, carbs, fat, fiber] (per 100g)
    const foodDatabase = [
        { name: "Apple", nutrients: [52, 0.3, 14, 0.2, 2.4] },
        { name: "Banana", nutrients: [89, 1.1, 23, 0.3, 2.6] },
        { name: "Chicken Breast", nutrients: [165, 31, 0, 3.6, 0] },
        { name: "Egg (Boiled)", nutrients: [155, 13, 1.1, 11, 0] },
        { name: "Oats", nutrients: [389, 16.9, 66.3, 6.9, 10.6] },
        { name: "Rice (White)", nutrients: [130, 2.7, 28, 0.3, 0.4] },
        { name: "Broccoli", nutrients: [34, 2.8, 7, 0.4, 2.6] },
        { name: "Almonds", nutrients: [579, 21, 22, 50, 12.5] },
        { name: "Salmon", nutrients: [208, 20, 0, 13, 0] },
        { name: "Greek Yogurt", nutrients: [59, 10, 3.6, 0.4, 0] }
    ];

    // --- Helper Functions ---

    const toggleModal = (modal, show) => {
        if (show) {
            modal.classList.remove('hiddenView');
        } else {
            modal.classList.add('hiddenView');
        }
    };

    const updateNutritionDisplay = (nutrients) => {
        if (!nutrients) {
            infoCal.textContent = '-';
            infoPro.textContent = '-';
            infoCarb.textContent = '-';
            infoFat.textContent = '-';
            return;
        }
        // [Cal, Pro, Carb, Fat, Fiber]
        infoCal.textContent = nutrients[0];
        infoPro.textContent = nutrients[1];
        infoCarb.textContent = nutrients[2];
        infoFat.textContent = nutrients[3];
    };

    const renderFoodList = (foods) => {
        foodListContainer.innerHTML = ''; // Clear current list

        if (foods.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'foodOption';
            noResult.style.cursor = 'default';
            noResult.style.color = '#999';
            noResult.textContent = 'No results found';
            foodListContainer.appendChild(noResult);
            return;
        }

        // Sort alphabetically
        foods.sort((a, b) => a.name.localeCompare(b.name));

        foods.forEach(food => {
            const div = document.createElement('div');
            div.className = 'foodOption';
            div.textContent = food.name;
            
            // Check if currently selected
            if (food.name === selectedFoodInput.value) {
                div.classList.add('selected');
            }

            div.addEventListener('click', () => {
                // Select this food
                selectedFoodInput.value = food.name;
                foodSearch.value = food.name;
                updateNutritionDisplay(food.nutrients);
                
                // Hide list after selection
                foodListContainer.classList.remove('active');
                
                // Show clear button since input has value
                clearSearchBtn.classList.remove('hiddenView');
            });

            foodListContainer.appendChild(div);
        });
        
        foodListContainer.classList.add('active');
    };

    // --- Event Listeners ---

    // 1. Search Input Logic
    if (foodSearch) {
        const showFilteredList = () => {
            const query = foodSearch.value.toLowerCase();
            const filtered = foodDatabase.filter(food => 
                food.name.toLowerCase().includes(query)
            );
            renderFoodList(filtered);
            
            if (query.length > 0) {
                clearSearchBtn.classList.remove('hiddenView');
            } else {
                clearSearchBtn.classList.add('hiddenView');
            }
        };

        foodSearch.addEventListener('input', showFilteredList);

        // Show full list when focusing or clicking
        foodSearch.addEventListener('focus', showFilteredList);
        foodSearch.addEventListener('click', showFilteredList);
    }

    // 2. Clear Button Logic
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            foodSearch.value = '';
            selectedFoodInput.value = '';
            clearSearchBtn.classList.add('hiddenView');
            updateNutritionDisplay(null);
            renderFoodList(foodDatabase); // Reset to full list
            foodSearch.focus();
        });
    }

    // 3. Close search list when clicking outside
    document.addEventListener('click', (e) => {
        if (!foodSearch.contains(e.target) && !foodListContainer.contains(e.target) && e.target !== clearSearchBtn) {
            foodListContainer.classList.remove('active');
        }
    });

    // 4. Quantity Stepper Logic
    if (qtyDec && qtyInc && foodQuantity) {
        qtyDec.addEventListener('click', () => {
            let currentVal = parseInt(foodQuantity.value) || 0;
            if (currentVal > 0) {
                foodQuantity.value = Math.max(0, currentVal - 10);
            }
        });

        qtyInc.addEventListener('click', () => {
            let currentVal = parseInt(foodQuantity.value) || 0;
            foodQuantity.value = currentVal + 10;
        });
    }

    // 5. Tabs Logic
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');
                // TODO: Switch chart/table data based on btn.dataset.tab (weekly/monthly)
            });
        });
    }


    // --- Modal Toggles ---
    if (todayMain) todayMain.addEventListener('click', () => toggleModal(modalNutrients, true));
    if (closeNutrientsBtn) closeNutrientsBtn.addEventListener('click', () => toggleModal(modalNutrients, false));
    if (modalNutrients) modalNutrients.addEventListener('click', (e) => { if (e.target === modalNutrients) toggleModal(modalNutrients, false); });

    if (navAdd) navAdd.addEventListener('click', () => toggleModal(addMealModal, true));
    if (closeAddMealBtn) closeAddMealBtn.addEventListener('click', () => toggleModal(addMealModal, false));
    if (addMealModal) addMealModal.addEventListener('click', (e) => { if (e.target === addMealModal) toggleModal(addMealModal, false); });

    // Stats Modal
    if (navStats) navStats.addEventListener('click', () => toggleModal(statsContainer, true));
    if (closeStatsBtn) closeStatsBtn.addEventListener('click', () => toggleModal(statsContainer, false));

    // Workout Modal
    if (navWorkout) navWorkout.addEventListener('click', () => toggleModal(workoutContainer, true));
    if (closeWorkoutBtn) closeWorkoutBtn.addEventListener('click', () => toggleModal(workoutContainer, false));

    // Form Submissions
    if (addMealForm) {
        addMealForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(`Submitted Meal: Food=${selectedFoodInput.value}, Qty=${foodQuantity.value}`);
            toggleModal(addMealModal, false);
        });
    }

    if (workoutForm) {
        workoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const exercise = document.getElementById('exerciseName').value;
            const sets = document.getElementById('sets').value;
            const reps = document.getElementById('reps').value;
            const weight = document.getElementById('weight').value;
            console.log(`Submitted Workout: ${exercise} - ${sets}x${reps} @ ${weight}kg`);
            // TODO: Add to list
        });
    }
});