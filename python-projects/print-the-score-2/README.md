# Print the Score - 2

## Question

Write a program that reads a distance D and prints D * 3 up to 50, then 50 * 3 + (D - 50) * 5.

## Supplied Python code

```python
D,score= int(input()) ,0
if D <= 50:
    score = (D * 3)
else:
    score = (50 * 3) + (D - 50)* 5
print(score)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 50 units | `'50\n'` | `'150\n'` |
| 60 units | `'60\n'` | `'200\n'` |
| 30 units | `'30\n'` | `'90\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_score_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer distance.
- Output: The score.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
