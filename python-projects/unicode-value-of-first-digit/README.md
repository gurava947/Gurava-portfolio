# Unicode Value of First Digit

## Question

Read a string and print the Unicode code point of its first digit.

## Supplied Python code

```python
S = input()
for i in S:
    if (i.isdigit()):
        value_digit = i
        break
print(ord(value_digit))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc5 | 'abc5\n' | '53\n' |
| Year 2026 | 'Year 2026\n' | '50\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_unicode_value_of_first_digit.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: One code point.
- The name holding the digit is bound only inside the loop, so a string with no digit raises UnboundLocalError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
