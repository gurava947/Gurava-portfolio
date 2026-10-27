# Course Fee

## Question

Write a program that reads a mark M. Print "Discount is 200" when M is at least 90, "Discount is 100" when M is between 50 and 100, and "No Discount" when M is below 50.

## Supplied Python code

```python
M = int(input())
if (M >= 90):
    print("Discount is 200")
elif (M >= 50) and (M <= 100):
    print("Discount is 100")
elif (M < 50):
    print("No Discount")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 100 | `'100\n'` | `'Discount is 200\n'` |
| M = 75 | `'75\n'` | `'Discount is 100\n'` |
| M = 30 | `'30\n'` | `'No Discount\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_course_fee.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: A discount message or empty output.
- Marks above 100 produce no output.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
