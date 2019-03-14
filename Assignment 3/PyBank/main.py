#Assignment 3
#PyBank

import os
import csv

counter = 0
Sum_Total = 0
differences = []
i = 2
Greatest_Increase = 0
Greatest_Decrease = 20

csv_path = ("../PyBank/Resources/budget_data.csv")

with open(csv_path, 'r') as csvfile:
	csv_reader = csv.reader(csvfile)
	next(csv_reader)
	prev_num = next(csv_reader)
	prev_num = prev_num[1]
	for row in csv_reader:
		#print(row)
		# The total number of months included in the dataset
		counter = counter + 1
		
		# The net totaly amount of "Profit/Losses" over the entire period
		Sum_Total = Sum_Total + int(row[1])

		# The average of the changes in "Profit/Losses" over the entire period
		differences.append(int(row[1])-int(prev_num))
		prev_num = int(row[1])

		Average_diff = round(sum(differences) / len(differences))

		# The Greatest Increase in profits (date and amount) over the entire period
		for i in differences:
			if i > Greatest_Increase:
				Greatest_Increase = i
				month_Increase = row[0]
	
		# The Greatest Decrease in losses (date and amount) over the entire period
			if i < Greatest_Decrease:
			 	Greatest_Decrease = i
			 	month_Decrease = row[0]

	#print(Greatest_Decrease)


	#print (Sum_Total)

print("Financial Analysis")
print("-------------------------")
print(f"Total Months: {counter}")
print(f"Total: {Sum_Total}")
print(f"Average Change: ${Average_diff}")
print(f"Greatest Increase In Profits: {month_Increase} ({Greatest_Increase})")
print(f"Greates Decrease In Profits: {month_Decrease} ({Greatest_Decrease})")
