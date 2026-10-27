# 2 Digit Divisible Number

## Question

Write a program that reads a two-digit number and prints twice the number when both of its digits divide it exactly, otherwise prints the number itself.

## Supplied Python code

```python
N = input()
if (int(N) % int(N[0]) == 0) and (int(N) % int(N[1]) == 0):
    print(int(N) * 2)
else:
    print(int(N))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 12: both digits divide | `'12\n'` | `'24\n'` |
| 14: 4 does not divide | `'14\n'` | `'14\n'` |
| 36: both digits divide | `'36\n'` | `'72\n'` |
| 25: 2 does not divide | `'25\n'` | `'25\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_two_digit_divisible_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A two-digit number.
- Output: Double the number or the number itself.
- A digit 0 raises ZeroDivisionError.
- A one-character input raises IndexError because N[1] is read.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
