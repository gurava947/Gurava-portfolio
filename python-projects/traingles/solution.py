A,B,C = int(input()),int(input()),int(input())
print("Equilateral" if A == B == C else 
"Isosceles" if A == B or B == C or C == A 
else "Scalene")
