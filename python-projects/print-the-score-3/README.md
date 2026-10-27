# Print the Score - 3

## Question

Write a program that reads a distance D, computes a slab score, adds a 30-point bonus, and prints the total.

## Supplied Python code

```python
D,cal_score = int(input()),0
if D <= 20:
    cal_score = (D * 2)
elif D <= 40:
    cal_score = (20 * 2) + ((D - 20) * 4)
elif D <= 60:
    cal_score = (20 * 2) + (40 * 4) + ((D - 60) * 4)
else:
    cal_score = (20 * 2) + (40 * 4) + ((D - 60) * 6)
print(cal_score  + 30)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 30 units | `'30\n'` | `'110\n'` |
| 50 units | `'50\n'` | `'190\n'` |
| 61 units | `'61\n'` | `'236\n'` |
| 70 units | `'70\n'` | `'290\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_score_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer distance.
- Output: The score including the bonus.
- For 41 to 60 units the third branch computes 40 + 160 + (D - 60) * 4, which subtracts 4 points per unit below 60; the 6-point rate applies only above 60.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
