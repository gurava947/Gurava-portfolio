# Number of Even Digits

## Question

Read a string of digits and print whether more than two of its digits are even.

## Supplied Python code

```python
Evan = input()
EvanCount = 0
def NumberOFEvanDigits(Evan,EvanCount):
    for i in Evan:
        if (int(i) % 2 == 0):
            EvanCount += 1
    if (EvanCount > 2):
        satues = "Count of even digits is greater than two"
    else:
        satues = "Count of even digits is not greater than two"
    print(satues)
NumberOFEvanDigits(Evan,EvanCount)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1234 | `'1234\n'` | `'Count of even digits is not greater than two\n'` |
| 2468 | `'2468\n'` | `'Count of even digits is greater than two\n'` |
| 1357 | `'1357\n'` | `'Count of even digits is not greater than two\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_number_of_even_digits.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string of digits.
- Output: A message about the count of even digits.
- Digits are read one character at a time, so a non-digit character raises ValueError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
