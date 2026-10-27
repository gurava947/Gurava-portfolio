# Electricity Bill

## Question

Write a program that reads the units consumed, computes the slab bill, adds 20%, and prints the total.

## Supplied Python code

```python
U, bill = int(input()), 0
if (U <= 50):
    bill = U * 2
elif (U <= 150):
    bill = (50 * 2) + (U - 50)*3
elif (U <= 250):
    bill = (50 * 2) + (100 * 3) + (U - 150)*5
else:
    bill = (50 * 2) + (100 * 3) + (100 * 5) + (U - 250)*8
Char_of_20_persentage = bill * 0.2 + bill
print(Char_of_20_persentage)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 40 units | `'40\n'` | `'96.0\n'` |
| 100 units | `'100\n'` | `'300.0\n'` |
| 200 units | `'200\n'` | `'780.0\n'` |
| 300 units | `'300\n'` | `'1560.0\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_electricity_bill.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer number of units.
- Output: The total bill as a float.
- The final value is a float because it includes the 20% charge, so whole-rupee bills print with .0.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
