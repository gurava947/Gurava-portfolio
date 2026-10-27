# Lucky Number - 2

## Question

Write a program that reads a two-digit number and prints "Lucky Number" when it is a multiple of 9 or either digit is 9, otherwise "Unlucky Number".

## Supplied Python code

```python
N = input()
if (int(N) % 9 == 0) or (int(N[0]) == 9 or int(N[1]) == 9):
    print("Lucky Number")
else:
    print("Unlucky Number")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 18 is a multiple of 9 | `'18\n'` | `'Lucky Number\n'` |
| 90 starts with 9 | `'90\n'` | `'Lucky Number\n'` |
| 29 ends with 9 | `'29\n'` | `'Lucky Number\n'` |
| 23 is unlucky | `'23\n'` | `'Unlucky Number\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_lucky_number_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A two-digit number.
- Output: Lucky Number or Unlucky Number.
- The input must have at least two characters because N[1] is read.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
