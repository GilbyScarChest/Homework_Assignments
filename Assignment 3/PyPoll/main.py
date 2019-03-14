#Assignment 3
#PyPoll

import os
import csv

Total_Count = 0
Candidate_list = []
Total_Candidate = {}
winner_tally = 0
results = []

csv_path = os.path.join("../PyPoll/Resources/election_data.csv")

with open(csv_path, 'r') as csvfile:
	csv_reader = csv.reader(csvfile)
	next(csv_reader)
	
	for row in csv_reader:
		#print(row)

		# Total number of votes cast
		Total_Count = Total_Count + 1

		# A complete list of candidates who recieved votes
		if row[2] not in Candidate_list:
			Candidate_list.append(row[2])

		# The total number of votes each candidate won
		if row[2] in Total_Candidate:
			Total_Candidate[row[2]] = Total_Candidate[row[2]] + 1
		else:
			Total_Candidate[row[2]] = 1

		# The Winner of the election based on popular vote
		Winner = max(Total_Candidate, key=Total_Candidate.get)

	# The percentage of votes each candidate won
	for k, v in Total_Candidate.items():
		pct = round(v / Total_Count * 100)
		Percent_votes = [k, str(pct) + "%", v]
		results.append(Percent_votes)

#print(Total_Candidate)
#print(Percent_votes)

print("Election Results")
print("---------------------------")
print(f"Total Votes: {Total_Count}")
print("---------------------------")
for i in results: print(i)
print("---------------------------")
print(f"Winner: {Winner}")
print("---------------------------")

