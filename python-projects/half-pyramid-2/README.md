# Half Pyramid - 2

## Question

Read N and print rows of 1, 2, 3... where the counter never resets.

## Supplied Python code

```python
N,K = int(input()),1
for i in range(N):
    rows = ""
    for j in range(i+1):
        rows = rows + str(K) +" "
        K += 1
    print(rows)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'1 \n2 3 \n4 5 6 \n7 8 9 10 \n'` |
| N = 3 | `'3\n'` | `'1 \n2 3 \n4 5 6 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_half_pyramid_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A triangle of increasing numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
