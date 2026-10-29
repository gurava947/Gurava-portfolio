# Valid Variable Name

## Question

Read a candidate variable name and print whether it passes the supplied check.

## Supplied Python code

```python
S = input()
count = 0
for i in S:
    if (i.islower() or i.isupper()):
        continue
    elif(i == " " or i == "_" or i.isalnum() or i == "%"):
        count += 1
if (count == 1):
    print(False)
else:
    print(True)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello | 'hello\n' | 'True\n' |
| 1abc | '1abc\n' | 'False\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_valid_variable_name.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: True or False.
- Spaces, underscores, digits and percent signs are counted and only a count of exactly one is rejected, so 'a b' passes while 'a1' does not.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
