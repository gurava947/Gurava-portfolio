# First Even Number

## Question

Read N, then read N numbers, and print the first positive even one.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    number_of_inputs = int(input())
    if (number_of_inputs % 2 == 0):
        if number_of_inputs > 0:
            print(number_of_inputs)
            break
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3, 7, 8, 10 | `'4\n3\n7\n8\n10\n'` | `'8\n'` |
| 1, 3, 5 | `'3\n1\n3\n5\n'` | `''` |

A case with an empty expected stdout means the program prints nothing for that input; the comparison expects an empty string.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_even_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The first positive even number, or nothing.
- Zero and negative even numbers are skipped, and no output appears when none match.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
