# First Negative Number

## Question

Read N, then read N numbers, and print the first negative one.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    number_of_inputs = int(input())
    if number_of_inputs < 0:
        print(number_of_inputs)
        break
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5, -3, 7, -2 | `'4\n5\n-3\n7\n-2\n'` | `'-3\n'` |
| 1, 2, 3 | `'3\n1\n2\n3\n'` | `''` |

A case with an empty expected stdout means the program prints nothing for that input; the comparison expects an empty string.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_negative_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The first negative number, or nothing.
- When no input is negative the program prints nothing at all.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
