# Lucky Number - 3

## Question

Write a program that reads a number and prints whether it is divisible by 6, by 3, by 2, or by none of them, choosing the first match in that order.

## Supplied Python code

```python
N = input()
if (int(N) % 6 == 0):
    print("Number is divisible by 6")
elif (int(N) % 3 == 0):
    print("Number is divisible by 3")
elif (int(N) % 2 == 0):
    print("Number is divisible by 2")
else:
    print("Number is not divisible by 2, 3 or 6")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 12 is divisible by 6 | `'12\n'` | `'Number is divisible by 6\n'` |
| 9 is divisible by 3 | `'9\n'` | `'Number is divisible by 3\n'` |
| 8 is divisible by 2 | `'8\n'` | `'Number is divisible by 2\n'` |
| 7 is divisible by none | `'7\n'` | `'Number is not divisible by 2, 3 or 6\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_lucky_number_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One of four divisibility messages.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
