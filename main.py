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