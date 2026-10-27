# Striped Rectangle

## Question

Read X and Y and print X rows of X characters, alternating between '*' and '-'.

## Supplied Python code

```python
import sys
X,Y = int(sys.stdin.readline()),int(sys.stdin.readline())
print('\n'.join(
    ('*' * X) if i % 2 == 0 else ("-" * X)
    for i in range(1,X+1)
    ))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 4, Y = 6 | `'4\n6\n'` | `'----\n****\n----\n****\n'` |
| X = 3, Y = 3 | `'3\n3\n'` | `'---\n***\n---\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_striped_rectangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: Alternating rows of stars and dashes.
- Y is read but never used; both the width and the row count come from X.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
