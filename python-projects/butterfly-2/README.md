# Butterfly - 2

## Question

Read N and print a butterfly shape with two full rows in the middle.

## Supplied Python code

```python
def butterfly():
    N = int(input())
    for row in range(1,N):
        hollow_sapces = (N - row)* "    "
        stars = row * "* "
        print(stars + hollow_sapces + stars)
    print((N * 2) * ("* "))
    print((N * 2) * ("* "))
    for row in range(1,N):
        hollow_sapces = row * "    "
        stars = (N - row) * "* "
        print(stars + hollow_sapces + stars)
butterfly()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'*         * \n* *     * * \n* * * * * * \n* * * * * * \n* *     * * \n*         * \n'` |
| N = 2 | `'2\n'` | `'*     * \n* * * * \n* * * * \n*     * \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_butterfly_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A star butterfly.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
