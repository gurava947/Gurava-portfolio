# Pair of Numbers

## Question

Read N and print how many pairs i < j of positive integers satisfy i + j = N.

## Supplied Python code

```python
def Pair_of_number():
    N = int(input())
    Pair_count = 0
    for i in range(1,N+1):
        for j in range(i+1,N+1):
            if ((i+j) == N):
                Pair_count += 1
    print(Pair_count)
Pair_of_number()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 9 | `'9\n'` | `'4\n'` |
| N = 4 | `'4\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_pair_of_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The number of pairs.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
