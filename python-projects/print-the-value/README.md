# Print the Value

## Question

Write a program that reads a value such as 5T, 3H or 2K and prints the expanded number.

## Supplied Python code

```python
def printTheValue():
    N = input()
    if (N[-1] == "T"):
        output = int(N[:-1]) * 10
    elif (N[-1] == "H"):
        output = int(N[:-1]) * 100
    elif (N[-1] == "K"):
        output = int(N[:-1]) * 1000
    print(output)
printTheValue()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5T means 50 | `'5T\n'` | `'50\n'` |
| 3H means 300 | `'3H\n'` | `'300\n'` |
| 2K means 2000 | `'2K\n'` | `'2000\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_value.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One value with a T, H or K suffix.
- Output: The expanded number.
- Any other suffix (or no suffix) leaves output unassigned and raises UnboundLocalError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
