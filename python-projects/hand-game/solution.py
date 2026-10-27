A,B = input(), input()
if A == B :
    print("Tie")
elif A == "Rock" and B == "Scissors":
    print("Abhinav Wins")
elif A == "Paper" and B == "Rock":
    print("Abhinav Wins")
elif A == "Scissors" and B == "Paper":
    print("Abhinav Wins")
else:
    print("Anjali Wins")
