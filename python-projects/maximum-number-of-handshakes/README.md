# Maximum number of handshakes

## Question

Write a program that reads the number of people N and prints the maximum number of handshakes.

## Supplied Python code

```python
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
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1 person | `'1\n'` | `'0\n'` |
| 2 people | `'2\n'` | `'2\n'` |
| 5 people | `'5\n'` | `'10\n'` |
| 10 people | `'10\n'` | `'45\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_maximum_number_of_handshakes.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: The handshake count.
- The supplied N = 2 branch prints 2; the standard formula would print 1.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
