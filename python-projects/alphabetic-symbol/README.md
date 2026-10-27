# Alphabetic Symbol

## Question

Read N and print a triangle where row i contains the first i letters.

## Supplied Python code

```python
def AlphabeticEymboles():
    N = int(input())
    Alpha = "ABCDEFGHIJKLMNOPQRSTVWXYZ"
    for row in range(N):
        count = 0
        for col in range(row + 1):
            print(Alpha[count],end=" ")
            count += 1
        print()
AlphabeticEymboles()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'A \nA B \nA B C \nA B C D \n'` |
| N = 5 | `'5\n'` | `'A \nA B \nA B C \nA B C D \nA B C D E \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabetic_symbol.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: An alphabet triangle.
- The alphabet string omits the letter U, so rows past T repeat the shift.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
