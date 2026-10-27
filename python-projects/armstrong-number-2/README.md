# Armstrong Number - 2

## Question

Write a program that reads a four-digit number and prints "Armstrong Number" when the sum of its four digits each raised to the fourth power equals the number, otherwise "Not an Armstrong Number".

## Supplied Python code

```python
N = input()
if (int(N[0]) ** len(N)) + (int(N[1]) ** len(N)) + (int(N[2]) ** len(N)) + (int(N[3]) ** len(N)) == int(N):
    print("Armstrong Number")
else:
    print("Not an Armstrong Number")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1634 is an Armstrong number | `'1634\n'` | `'Armstrong Number\n'` |
| 9474 is an Armstrong number | `'9474\n'` | `'Armstrong Number\n'` |
| 8208 is an Armstrong number | `'8208\n'` | `'Armstrong Number\n'` |
| 1234 is not an Armstrong number | `'1234\n'` | `'Not an Armstrong Number\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_armstrong_number_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A four-digit number.
- Output: Armstrong Number or Not an Armstrong Number.
- Shorter inputs raise IndexError because four characters are read.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
