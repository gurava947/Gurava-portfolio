# Print the Score - 5

## Question

Write a program that reads a distance D, computes a slab score, adds a 100-point bonus, and prints the total.

## Supplied Python code

```python
D,score = int(input()),0
if (D <= 50):
    score = (D * 3)
elif (D <= 100):
    score = (50 * 3) + ((D - 50) * 5)
elif (D <= 200):
    score = (50 * 3) + (50 * 5) + ((D - 100) * 6)
else:
    score = (50 * 3) + (50 * 5) + (100 * 6)+ ((D - 200) * 10)
print(100 + score)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 50 units | `'50\n'` | `'250\n'` |
| 100 units | `'100\n'` | `'500\n'` |
| 150 units | `'150\n'` | `'800\n'` |
| 250 units | `'250\n'` | `'1600\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_score_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer distance.
- Output: The score including the bonus.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
