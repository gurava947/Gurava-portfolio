# Win or Lose or Draw - 2

## Question

Read two scores and print Win, Draw or Lose for the first against the second.

## Supplied Python code

```python
def compare(A, B):
    if (A > B):
        value = "Win"
    elif (A == B):
        value = "Draw"
    else:
        value = "Lose"
    return value
A = int(input())
B = int(input())
compare_result = compare(A,B)
print(compare_result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| ahead | '10\n5\n' | 'Win\n' |
| level | '5\n5\n' | 'Draw\n' |
| behind | '3\n8\n' | 'Lose\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_win_or_lose_or_draw_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One label.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
