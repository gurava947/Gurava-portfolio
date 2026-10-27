# Sum of The Digits - 2

## Question

Write a program that reads a number with up to four digits and prints the sum of its digits.

## Supplied Python code

```python
N = input()
adding = 0
if int(N) <= 9:
    adding = N
elif int(N) <= 99:
    adding =   int(N[0])+int(N[1])
elif int(N) <= 999:
    adding =   int(N[0])+int(N[1])+int(N[2])
else:
    adding =   int(N[0])+int(N[1])+int(N[2])+int(N[3])
print(adding)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5 | `'5\n'` | `'5\n'` |
| 42 | `'42\n'` | `'6\n'` |
| 123 | `'123\n'` | `'6\n'` |
| 1234 | `'1234\n'` | `'10\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_the_digits_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A number with up to four digits.
- Output: The digit sum.
- Inputs longer than four digits contribute only their first four characters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
