# Alphabets in Square

## Question

Read N and print N rows of the first N letters.

## Supplied Python code

```python
def Alphabets_in_square():
    N = int(input())
    Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for i in range(N):
        for j in range(N):
            row = ""
            row += Alpha[j] + " "
            print(row,end="")
        print()
Alphabets_in_square()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'A B C \nA B C \nA B C \n'` |
| N = 4 | `'4\n'` | `'A B C D \nA B C D \nA B C D \nA B C D \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabets_in_square.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: An alphabet square.
- Inputs above 26 raise IndexError because the alphabet string holds 26 letters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
