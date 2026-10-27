N,handshacke= int(input()),0
if N == 1:
    handshacke = 0
elif N == 2:
    handshacke = 1 + 1 + 0
elif N == 3:
    handshacke = 2 + 1 + 0
elif N == 4:
    handshacke = 3 + 2 + 1 + 0
elif N == 5:
    handshacke = 4 + 3 + 2 + 1 + 0
else:
    handshacke = int( N * (N - 1) / 2)
print(handshacke)
