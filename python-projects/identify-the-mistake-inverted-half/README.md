# Identify the Mistake - Inverted Half

## Question

Read N and print rows whose digits count down from the row width to 1.

## Supplied Python code

```python
N = int(input())
for i in range(1,N+1):
    rows = ""
    for j in range(1,N-i+2):
        rows = str(j) + rows
    print(rows)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'4321\n321\n21\n1\n'` |
| N = 3 | `'3\n'` | `'321\n21\n1\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_identify_the_mistake_inverted_half.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: Rows of reversed digits.
- The supplied title is stored verbatim, including its trailing space.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
