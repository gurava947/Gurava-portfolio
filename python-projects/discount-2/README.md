# Discount - 2

## Question

Read an amount and print the discount that applies to it.

## Supplied Python code

```python
def get_discount(amount):
    if (500 > amount):
        return "5%"
    elif(2500 > amount):
        return "10%"
    else:
        return "20%"
amount = int(input())
total = get_discount(amount = amount)
print(total)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| below five hundred | '400\n' | '5%\n' |
| at five hundred | '500\n' | '10%\n' |
| at two thousand five hundred | '2500\n' | '20%\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_discount_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: One percentage label.
- The bands are written as upper bounds, so exactly 500 takes the ten percent band and exactly 2500 takes twenty percent.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
