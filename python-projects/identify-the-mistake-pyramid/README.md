# Identify The Mistake - Pyramid

## Question

Read N and print a pyramid with leading spaces and one more star pair per row.

## Supplied Python code

```python
n = int(input())
k = n-1
for i in range(1, n+1):
 spaces = " " * k
 stars = "* " * i
 print(spaces+stars)
 k = k - 1
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   * \n  * * \n * * * \n* * * * \n'` |
| N = 2 | `'2\n'` | `' * \n* * \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_identify_the_mistake_pyramid.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A right-aligned star pyramid.
- The supplied title calls this a mistake exercise; the code itself prints a correct pyramid.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
