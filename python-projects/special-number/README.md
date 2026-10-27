# Special Number

## Question

Write a program that reads a two-digit number and prints "Special Number" when its digits add to 7, either digit is 7, or the number is a multiple of 7, otherwise "Normal Number".

## Supplied Python code

```python
N = input()
if (int(N[0]) + int(N[1]) == 7) or (int(N[0]) == 7 or int(N[1]) == 7) or (int(N) % 7 == 0):
    print("Special Number")
else:
    print("Normal Number")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 25 has digit sum 7 | `'25\n'` | `'Special Number\n'` |
| 71 contains 7 | `'71\n'` | `'Special Number\n'` |
| 14 is a multiple of 7 | `'14\n'` | `'Special Number\n'` |
| 23 is normal | `'23\n'` | `'Normal Number\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_special_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A two-digit number.
- Output: Special Number or Normal Number.
- The input must have at least two characters because N[1] is read.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
