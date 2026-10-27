# Armstrong numbers between two in

## Question

Read two bounds and print every Armstrong number between them, or -1 if none match.

## Supplied Python code

```python
def Armstrong_Number_BetWeen_Two_intervals():
    N,M = int(input()),int(input())
    Armestrong  = ""
    for Number in range(N,M+1):
        Digits = 0
        Number = str(Number)
        Powers = len(Number)
        for i in Number:
            i = int(i)
            Digits += (i ** Powers)
        if (Digits == int(Number)):
            Armestrong += Number + " "
    if (Armestrong):
        print(Armestrong)
    else:
        print(-1)
Armstrong_Number_BetWeen_Two_intervals()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 100, M = 500 | `'100\n500\n'` | `'153 370 371 407 \n'` |
| N = 100, M = 150 | `'100\n150\n'` | `'-1\n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_armstrong_numbers_between_two_in.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers N and M.
- Output: Matching numbers on one line, or -1.
- Matches are printed with a trailing space. The supplied title is truncated in the source document; it is stored verbatim.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
