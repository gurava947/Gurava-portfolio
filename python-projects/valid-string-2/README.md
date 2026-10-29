# Valid String - 2

## Question

Read a string and print Valid String only when it has at least five characters.

## Supplied Python code

```python
def valid_string(string):
    return  "Valid String" if (len(string) >= 5)  else "Invalid String"
string = input()
result = valid_string(string = string)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| exactly five | 'Hello\n' | 'Valid String\n' |
| too short | 'Hi\n' | 'Invalid String\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_valid_string_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: One label.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
