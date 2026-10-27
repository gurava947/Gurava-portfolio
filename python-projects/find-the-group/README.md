# Find the Group

## Question

Write a program that reads an integer and prints Group A when it is odd, otherwise Group B.

## Supplied Python code

```python
G = int(input())
if G % 2 == 1:
    print("Group A")
else:
    print("Group B")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 7 is odd | `'7\n'` | `'Group A\n'` |
| 8 is even | `'8\n'` | `'Group B\n'` |
| 0 is even | `'0\n'` | `'Group B\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_find_the_group.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Group A or Group B.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
