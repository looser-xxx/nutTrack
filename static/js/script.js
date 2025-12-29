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
    const chartBars = document.querySelectorAll('.bar');
    const goalFills = document.querySelectorAll('.goalFill');
    const countUpElements = document.querySelectorAll('.countUp');
    const insightText = document.getElementById('insightText');

    // Workout Elements
    const navWorkout = document.getElementById('navWorkout');
    const workoutContainer = document.getElementById('workoutContainer');
    const closeWorkoutBtn = document.getElementById('closeWorkout');
    const workoutForm = document.getElementById('workoutForm');

    // Today's Meals Elements
    const viewAllMealsBtn = document.getElementById('viewAllMealsBtn');
    const todaysMealsContainer = document.getElementById('todaysMealsContainer');
    const closeTodaysMealsBtn = document.getElementById('closeTodaysMeals');
    const todaysMealList = document.getElementById('todaysMealList');


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

    // --- Mock Data ---
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

    let typingTimer = null;

    // --- Helper Functions ---

    const toggleModal = (modal, show) => {
        if (show) {
            modal.classList.remove('hiddenView');
            // Trigger specific actions when opening
            if (modal === statsContainer) {
                playStatsAnimation();
            }
            if (modal === modalNutrients) {
                // Animate Nutrients Numbers & Bars
                // Mock daily totals for demo:
                const targets = {
                    'valCalories': 1250,
                    'valProtein': 85,
                    'valCarbs': 140,
                    'valFat': 45,
                    'valFiber': 22
                };
                
                // Hardcoded goals matching HTML text
                const goals = {
                    'valCalories': 2500,
                    'valProtein': 180,
                    'valCarbs': 300,
                    'valFat': 80,
                    'valFiber': 35
                };

                // Reset bars first
                Object.keys(targets).forEach(id => {
                    const fillId = id.replace('val', 'fill');
                    const fillEl = document.getElementById(fillId);
                    if(fillEl) fillEl.style.width = '0%';
                });

                setTimeout(() => {
                    Object.keys(targets).forEach(id => {
                        // Animate Number
                        const el = document.getElementById(id);
                        if (el) {
                            animateValue(el, 0, targets[id], 1000);
                        }
                        
                        // Animate Bar
                        const fillId = id.replace('val', 'fill');
                        const fillEl = document.getElementById(fillId);
                        if (fillEl) {
                            const pct = Math.min((targets[id] / goals[id]) * 100, 100);
                            fillEl.style.width = pct + '%';
                        }
                    });
                }, 50);
            }
        } else {
            modal.classList.add('hiddenView');
            // Reset animations when closing to allow re-play
            if (modal === statsContainer) {
                resetStatsAnimation();
            }
        }
    };

    // --- Animation Logic ---

    const resetStatsAnimation = () => {
        chartBars.forEach(bar => {
            bar.classList.remove('animate');
            void bar.offsetWidth; 
        });
        goalFills.forEach(fill => {
            fill.style.width = '0%';
        });
        countUpElements.forEach(el => {
            el.textContent = '0';
        });
        if (typingTimer) clearTimeout(typingTimer);
        insightText.innerHTML = '';
    };

    const playStatsAnimation = () => {
        resetStatsAnimation();
        
        setTimeout(() => {
            chartBars.forEach((bar) => {
                bar.classList.add('animate');
            });

            goalFills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width;
            });

            countUpElements.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                animateValue(el, 0, target, 1000);
            });

            const mockInsight = "Based on your recent patterns, you're doing great with protein! Consider increasing your fiber intake during breakfast to maintain steady energy levels throughout the afternoon.";
            typeWriter(mockInsight, insightText, 30); // 30ms per char
        }, 50);
    };

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const typeWriter = (text, element, speed) => {
        element.innerHTML = '';
        let i = 0;
        
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        
        const type = () => {
            if (i < text.length) {
                // Insert text before the cursor
                element.innerHTML = text.substring(0, i + 1);
                element.appendChild(cursor);
                i++;
                typingTimer = setTimeout(type, speed);
            }
        };
        
        type();
    };


    const updateNutritionDisplay = (nutrients) => {
        if (!nutrients) {
            infoCal.textContent = '-';
            infoPro.textContent = '-';
            infoCarb.textContent = '-';
            infoFat.textContent = '-';
            return;
        }
        infoCal.textContent = nutrients[0];
        infoPro.textContent = nutrients[1];
        infoCarb.textContent = nutrients[2];
        infoFat.textContent = nutrients[3];
    };

    const renderFoodList = (foods) => {
        foodListContainer.innerHTML = '';
        if (foods.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'foodOption';
            noResult.style.cursor = 'default';
            noResult.style.color = '#999';
            noResult.textContent = 'No results found';
            foodListContainer.appendChild(noResult);
            return;
        }
        foods.sort((a, b) => a.name.localeCompare(b.name));
        foods.forEach(food => {
            const div = document.createElement('div');
            div.className = 'foodOption';
            div.textContent = food.name;
            if (food.name === selectedFoodInput.value) div.classList.add('selected');
            div.addEventListener('click', () => {
                selectedFoodInput.value = food.name;
                foodSearch.value = food.name;
                updateNutritionDisplay(food.nutrients);
                foodListContainer.classList.remove('active');
                clearSearchBtn.classList.remove('hiddenView');
            });
            foodListContainer.appendChild(div);
        });
        foodListContainer.classList.add('active');
    };

    // --- Event Listeners ---
    
    // Accordion Logic for Today's Meals
    if (todaysMealList) {
        todaysMealList.addEventListener('click', (e) => {
            const item = e.target.closest('.expandable');
            if (!item) return;

            const targetId = item.getAttribute('data-details');
            const targetDetails = document.getElementById(targetId);

            // Close all others
            const allItems = todaysMealList.querySelectorAll('.expandable');
            const allDetails = todaysMealList.querySelectorAll('.mealDetails');

            allItems.forEach(i => {
                if (i !== item) i.classList.remove('expanded');
            });
            allDetails.forEach(d => {
                if (d !== targetDetails) d.classList.add('hiddenView');
            });

            // Toggle current
            item.classList.toggle('expanded');
            targetDetails.classList.toggle('hiddenView');
        });
    }


    if (foodSearch) {
        const showFilteredList = () => {
            const query = foodSearch.value.toLowerCase();
            const filtered = foodDatabase.filter(food => food.name.toLowerCase().includes(query));
            renderFoodList(filtered);
            if (query.length > 0) clearSearchBtn.classList.remove('hiddenView');
            else clearSearchBtn.classList.add('hiddenView');
        };
        foodSearch.addEventListener('input', showFilteredList);
        foodSearch.addEventListener('focus', showFilteredList);
        foodSearch.addEventListener('click', showFilteredList);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            foodSearch.value = '';
            selectedFoodInput.value = '';
            clearSearchBtn.classList.add('hiddenView');
            updateNutritionDisplay(null);
            renderFoodList(foodDatabase);
            foodSearch.focus();
        });
    }

    document.addEventListener('click', (e) => {
        if (!foodSearch.contains(e.target) && !foodListContainer.contains(e.target) && e.target !== clearSearchBtn) {
            foodListContainer.classList.remove('active');
        }
    });

    if (qtyDec && qtyInc && foodQuantity) {
        qtyDec.addEventListener('click', () => {
            let currentVal = parseInt(foodQuantity.value) || 0;
            if (currentVal > 0) foodQuantity.value = Math.max(0, currentVal - 10);
        });
        qtyInc.addEventListener('click', () => {
            let currentVal = parseInt(foodQuantity.value) || 0;
            foodQuantity.value = currentVal + 10;
        });
    }

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                playStatsAnimation();
            });
        });
    }

    if (todayMain) todayMain.addEventListener('click', () => toggleModal(modalNutrients, true));
    if (closeNutrientsBtn) closeNutrientsBtn.addEventListener('click', () => toggleModal(modalNutrients, false));
    if (modalNutrients) modalNutrients.addEventListener('click', (e) => { if (e.target === modalNutrients) toggleModal(modalNutrients, false); });

    if (navAdd) navAdd.addEventListener('click', () => toggleModal(addMealModal, true));
    if (closeAddMealBtn) closeAddMealBtn.addEventListener('click', () => toggleModal(addMealModal, false));
    if (addMealModal) addMealModal.addEventListener('click', (e) => { if (e.target === addMealModal) toggleModal(addMealModal, false); });

    if (navStats) navStats.addEventListener('click', () => toggleModal(statsContainer, true));
    if (closeStatsBtn) closeStatsBtn.addEventListener('click', () => toggleModal(statsContainer, false));

    if (navWorkout) navWorkout.addEventListener('click', () => toggleModal(workoutContainer, true));
    if (closeWorkoutBtn) closeWorkoutBtn.addEventListener('click', () => toggleModal(workoutContainer, false));

    // Today's Meals Toggle
    if (viewAllMealsBtn) viewAllMealsBtn.addEventListener('click', () => toggleModal(todaysMealsContainer, true));
    if (closeTodaysMealsBtn) closeTodaysMealsBtn.addEventListener('click', () => toggleModal(todaysMealsContainer, false));

    // Side Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenuBtn = document.getElementById('closeMenu');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => toggleModal(menuOverlay, true));
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => toggleModal(menuOverlay, false));
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                toggleModal(menuOverlay, false);
            }
        });
    }


    if (addMealForm) {
        addMealForm.addEventListener('submit', (e) => {
            e.preventDefault();
            toggleModal(addMealModal, false);
        });
    }

    if (workoutForm) {
        workoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
});
