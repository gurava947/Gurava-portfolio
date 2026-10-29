# Valid Variable Name - 2

## Question

Read a candidate variable name and print whether its first character passes the supplied check.

## Supplied Python code

```python
s = input()
first_s = ord(s[0])
is_upper = first_s >= 65 <= 90
is_lower = first_s >= 97 <= 122
special_char = chr(first_s) == "_"
check = is_upper or is_lower or special_char
print(check)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc | 'abc\n' | 'True\n' |
| 5abc | '5abc\n' | 'False\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_valid_variable_name_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: True or False.
- The ranges are written as chained comparisons, so first_s >= 65 <= 90 asks whether first_s is at least 65 and whether 65 is at most 90. Any first character from 65 upwards therefore reports True, including lowercase letters and the underscore.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
