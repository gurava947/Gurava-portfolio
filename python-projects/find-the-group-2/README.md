# Find the Group - 2

## Question

Write a program that reads an integer and prints Group 1 through Group 6 based on its remainder modulo 6.

## Supplied Python code

```python
G = int(input())
if (G % 6 == 1):
    print("Group 1")
elif (G % 6 == 2):
    print("Group 2")
elif (G % 6 == 3):
    print("Group 3")
elif (G % 6 == 4):
    print("Group 4")
elif (G % 6 == 5):
    print("Group 5")
else:
    print("Group 6")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1 | `'1\n'` | `'Group 1\n'` |
| 5 | `'5\n'` | `'Group 5\n'` |
| 6 | `'6\n'` | `'Group 6\n'` |
| 7 | `'7\n'` | `'Group 1\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_find_the_group_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Group 1 to Group 6.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
