# Calculate Bill

## Question

Read a bill amount and print what remains after the discount that applies to it.

## Supplied Python code

```python
def calculateBill(value):
    if (value < 500):
        cost = (value - (value * 0.05))
    elif (500 <= value < 2500):
        cost = (value - (value * 0.1))
    else:
        cost = (value - (value * 0.2))
    return round(cost,3)
value = int(input())
Total = calculateBill(value)
print(Total)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| five percent band | '100\n' | '95.0\n' |
| ten percent band | '1000\n' | '900.0\n' |
| twenty percent band | '3000\n' | '2400.0\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_calculate_bill.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: One number.
- The cost is rounded to three places, so amounts with an odd five percent still print cleanly.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
