# String Repetition

## Question

Write a program that reads a string and a repeat count B, then prints the string repeated B times with a space after each copy.

## Supplied Python code

```python
A,B = input(),int(input())
adding = (A + " ")*B
print(adding)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hi twice | `'Hi\n2\n'` | `'Hi Hi \n'` |
| abc once | `'abc\n1\n'` | `'abc \n'` |
| Hi three times | `'Hi\n3\n'` | `'Hi Hi Hi \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_string_repetition.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A string, then a repeat count.
- Output: The repeated text with trailing spaces.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
