# Win or Lose or Draw

## Question

Write a program that reads two integers A and B and prints "Win" when A is greater, "Draw" when they are equal, otherwise "Lose".

## Supplied Python code

```python
A , B = int(input()) , int(input())
if (A > B):
    print("Win")
elif (A == B):
    print("Draw")
else:
    print("Lose")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3 versus 1 | `'3\n1\n'` | `'Win\n'` |
| 2 versus 2 | `'2\n2\n'` | `'Draw\n'` |
| 1 versus 3 | `'1\n3\n'` | `'Lose\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_win_or_lose_or_draw.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: Win, Draw or Lose.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
