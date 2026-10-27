# Print the Score - 4

## Question

Write a program that reads a distance D, computes a slab score, adds a 50-point bonus, and prints the total.

## Supplied Python code

```python
D,score,boues = int(input()),0,50
if (D <= 40):
    score = (D * 2)
elif (D <= 60):
    score = (40 * 2) + (D - 40)* 4
elif ((D <= 120)):
    score = (40 * 2) + (20 * 4) + (D - 60)*6
else:
    score = (40 * 2) + (20 * 4) + (60 * 6) + (D - 120)*8
print(score + boues)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 40 units | `'40\n'` | `'130\n'` |
| 50 units | `'50\n'` | `'170\n'` |
| 100 units | `'100\n'` | `'450\n'` |
| 150 units | `'150\n'` | `'810\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_score_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer distance.
- Output: The score including the bonus.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
