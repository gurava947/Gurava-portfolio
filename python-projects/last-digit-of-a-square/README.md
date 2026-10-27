# Last Digit of a Square

## Question

Write a program that reads an integer N and prints "Equal" when the last digit of N equals the last digit of N squared, otherwise "Not Equal".

## Supplied Python code

```python
N = input()
lenth_N = len(N)-1
var1 = (str(int(N) ** 2))
lenth_of = len(var1)-1
if (int(N[lenth_N]) == int(var1[lenth_of])):
    print("Equal")
else:
    print("Not Equal")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5 squared ends in 5 | `'5\n'` | `'Equal\n'` |
| 6 squared ends in 6 | `'6\n'` | `'Equal\n'` |
| 12 squared ends in 4 | `'12\n'` | `'Not Equal\n'` |
| 13 squared ends in 9 | `'13\n'` | `'Not Equal\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_last_digit_of_a_square.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Equal or Not Equal.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
