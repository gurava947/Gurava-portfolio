# Rankers

## Question

Write a program that reads a rank R and prints "One of Top 3" when R is at most 3, "Not Top 3 but One of Top 10" when R is at most 10, and nothing otherwise.

## Supplied Python code

```python
R = int(input())
if (R <= 3):
    print("One of Top 3")
elif (R <= 10):
    print("Not Top 3 but One of Top 10")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Rank 2 | `'2\n'` | `'One of Top 3\n'` |
| Rank 7 | `'7\n'` | `'Not Top 3 but One of Top 10\n'` |
| Rank 3 | `'3\n'` | `'One of Top 3\n'` |
| Rank 12 | `'12\n'` | `''` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_rankers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer rank.
- Output: A rank message or empty output.
- Ranks above 10 print nothing.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
