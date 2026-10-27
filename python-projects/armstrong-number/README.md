# Armstrong Number

## Question

Write a program that reads a three-digit number and prints True when the sum of its digits each raised to the third power equals the number, otherwise False.

## Supplied Python code

```python
N = input()
if (int(N[0]) ** len(N) + int(N[1]) ** len(N) + int(N[2]) ** len(N)) == int(N):
    print(True)
else:
    print(False)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 153 is an Armstrong number | `'153\n'` | `'True\n'` |
| 370 is an Armstrong number | `'370\n'` | `'True\n'` |
| 123 is not an Armstrong number | `'123\n'` | `'False\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_armstrong_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A three-digit number.
- Output: True or False.
- Output is Python's boolean text: True or False.
- A four-digit input ignores the fourth digit; a one- or two-digit input raises IndexError.
- 370 works because 3^3 + 7^3 + 0^3 = 370.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
