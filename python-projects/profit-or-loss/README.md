# Profit or Loss

## Question

Write a program that reads the selling price and cost price and prints which trade result applies.

## Supplied Python code

```python
SP = int(input())
CP = int(input())

if SP < CP:
    print("Profit")
elif SP > CP:
    print("Loss")
else:
    print("No Profit - No Loss")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| SP 80, CP 100 | `'80\n100\n'` | `'Profit\n'` |
| SP 120, CP 100 | `'120\n100\n'` | `'Loss\n'` |
| SP 100, CP 100 | `'100\n100\n'` | `'No Profit - No Loss\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_profit_or_loss.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Selling price then cost price.
- Output: Profit, Loss or No Profit - No Loss.
- Profit and Loss labels are inverted relative to the usual meaning.
- When SP is below CP the code prints Profit, although that is normally a loss.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
