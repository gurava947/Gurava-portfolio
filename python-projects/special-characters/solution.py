def special_char():
    S,V = input(),"AEIOUaeiou"
    S = S.replace(" ","")
    V_count,V_not_count = 0,0
    for i in S:
        if i in V:
            V_count += 1
        else:
            V_not_count += 1
    print(V_count)
    print(V_not_count)
special_char()
