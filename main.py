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