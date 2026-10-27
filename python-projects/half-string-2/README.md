# Half String - 2

## Question

Read a string and print the second half of it.

## Supplied Python code

```python
string = input();half_string = int(len(string) /2) 
print(string[half_string:])
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello | `'Hello'` | `'llo\n'` |
| Python | `'Python'` | `'hon\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_half_string_2.py" -v
```

Edge cases covered:

- Empty string: stdin `'\n'`, stdout `'\n'`.
- One character: stdin `'A'`, stdout `'A\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program halves the length, truncates it with int(), and prints from that index to the end. Odd lengths keep the larger second half.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
