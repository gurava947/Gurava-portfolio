# Inverted Right Angled Triangle - 7

## Question

Read N and print rows of N down to 1 stars.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    for j in range(N-i):
        print("* " ,end = "")
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'* * * * \n* * * \n* * \n* \n'` |
| N = 1 | `'1\n'` | `'* \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_inverted_right_angled_triangle_7.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A shrinking triangle of stars.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
