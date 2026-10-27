# Special String

## Question

Write a program that reads a string. Print "Special String" when it starts with NXT and the remaining digits form a number that is even or divisible by 7, otherwise print "Not a Special String".

## Supplied Python code

```python
string_number = input()
if (string_number[:3] == "NXT") and ((int(string_number[3:]) % 2 == 0) or (int(string_number[3:]) % 7 == 0)):
    print("Special String")
else:
    print("Not a Special String")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| NXT12 is even | `'NXT12\n'` | `'Special String\n'` |
| NXT7 is divisible by 7 | `'NXT7\n'` | `'Special String\n'` |
| NXT9 is neither | `'NXT9\n'` | `'Not a Special String\n'` |
| ABC14 has the wrong prefix | `'ABC14\n'` | `'Not a Special String\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_special_string.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string such as NXT14.
- Output: Special String or Not a Special String.
- A prefix other than NXT still makes the code convert the suffix, so a non-numeric suffix raises ValueError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
