import csv
from datetime import datetime
import json


def getData():
    """
    Reads the 'food.csv' file and parses it into a dictionary.

    This function is hard-coded to read 'food.csv'. It assumes the first
    column is the food name (string) and the next 5 columns are
    nutrient values (convertible to float).

    Parameters:
        None

    Returns:
        foodWithNutrition (dict): A dictionary where:
                                  - keys are food names (str)
                                  - values are lists of 5 nutrient values (float)
    """
    print("getting data from CSV")

    foodWithNutrition = {}

    try:
        with open('food.csv', 'r', newline='', encoding='utf-8') as file:
            reader = csv.reader(file)
            for row in reader:
                tempKey = row[0]
                row.pop(0)
                for i in range(5):
                    row[i] = float(row[i]) / 100
                foodWithNutrition[tempKey] = row

            return foodWithNutrition

    except FileNotFoundError:
        print("🚨 Error: 'food.csv' not found. Please ensure the file exists.")
        return {}



def getInput():
    """
    Gets meal input from the user in a continuous loop.

    This function repeatedly asks the user for a food item and an
    amount (in grams/units). The loop breaks when the user types 'exit'.
    It includes error handling to ensure the amount is a valid number.

    Parameters:
        None

    Returns:
        meals (list): A list of tuples, where each tuple is (foodName, amount).
                      e.g., [('Apple', 150.0), ('Banana', 100.0)]
    """
    meals = []
    while True:
        tempFood = input("What did you have: ")
        if tempFood.lower() == 'exit':
            break

        try:
            tempAmount = float(input("How much of it (in grams/units): "))
            meals.append((tempFood, tempAmount))

        except ValueError:
            print("🚨 Invalid amount entered. Please enter a number.")
            continue
    return meals

def nutritionConsumed(meals, foodData):
    """
    Calculates the total nutrition consumed from a list of meals.

    This function takes a list of meals (food, amount) and a dictionary
    of food data. It loops through each meal, finds the nutrition data,
    multiplies it by the amount, and adds it to a running total.
    It safely skips any food not found in the foodData dictionary.

    Parameters:
        meals (list): A list of tuples, where each tuple is (foodName, amount).
                      e.g., [('Apple', 150.0), ('Banana', 100.0)]
        foodData (dict): A dictionary from getData(), where keys are food names
                         and values are lists of nutrient values.

    Returns:
        nutritionConsumed (list): A list of 5 floats representing the
                                  sum of each nutrient.
    """
    nutritionConsumed = [0, 0, 0, 0, 0]
    for meal in meals:
        nutritionPerGram = foodData.get(meal[0])

        i = 0
        if nutritionPerGram:
            for values in nutritionPerGram:
                values = values * meal[1]
                nutritionConsumed[i] += values
                i += 1
        else:
            print(f"⚠️ Warning: Food '{meal[0]}' not found in data. Skipping.")

    return nutritionConsumed

def isSameDay(currentDay):
    """
    Checks if the provided date matches the date stored in 'currentDay.json'.

    This function reads the 'currentDay.json' file, extracts the value
    from the 'date' key, and compares it to the 'currentDay' parameter.
    It handles FileNotFoundError and other exceptions gracefully by
    returning False.

    Parameters:
        currentDay (str): The current date string to check (e.g., "2025-11-14").

    Returns:
        (bool): True if the dates match, False otherwise (including if the
                file is not found or an error occurs).
    """
    fileName = 'currentDay.json'
    try:
        # Open the JSON file in 'read' mode
        with open(fileName, 'r', encoding='utf-8') as file:
            loadedData = json.load(file)
            lastContent = loadedData['date']
            if currentDay == lastContent.strip():
                return True

    except FileNotFoundError:
        print(f"🚨 Error: The file '{fileName}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

    return False

def updateToday(nutritionConsumed):
    """
    Updates the 'currentDay.json' file with newly consumed nutrition.

    This function first READS the current totals from 'currentDay.json'.
    It then adds the new 'nutritionConsumed' values to the existing totals
    in memory. Finally, it over-writes the 'currentDay.json' file
    with the updated data.

    If the file is not found or a read error occurs, the function
    will print an error and stop, preventing a crash.

    Parameters:
        nutritionConsumed (list): A list of 5 floats with the
                                  nutrition totals to be added.

    Returns:
        None
    """
    fileName = 'currentDay.json'

    try:
        with open(fileName, 'r', encoding='utf-8') as file:
            loadedData = json.load(file)

    except FileNotFoundError:
        print(f"🚨 Error: The file '{fileName}' was not found.")
        return
    except Exception as e:
        print(f"An error occurred: {e}")
        return

    previousNutrition = loadedData['dailyTotals']
    newData = []

    for i in range(5):
        newData.append(nutritionConsumed[i] + previousNutrition[i])

    loadedData['dailyTotals'] = newData

    try:
        with open(fileName, 'w', encoding='utf-8') as file:
            json.dump(loadedData, file, indent=4)
        print("✅ Successfully updated today's totals.")
    except Exception as e:
        print(f"An error occurred while writing: {e}")

