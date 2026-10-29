# Hyphenate Letters

## Question

Read a value and insert a hyphen between each of its letters, leaving anything that is not a letter where it is.

## Supplied Python code

```python
N = input()
new_string = N[0]
for i in range(1,len(N)):
    if (N[i].islower()) or (N[i].isupper()):
        new_string += "-" + N[i]
    else:
        new_string += N[i]
print(new_string)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc123 | 'abc123\n' | 'a-b-c123\n' |
| Hi9 | 'Hi9\n' | 'H-i9\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hyphenate_letters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: One hyphenated line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
