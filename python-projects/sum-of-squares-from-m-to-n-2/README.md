# Sum of Squares from M to N - 2

## Question

Read a range and print the sum of the squares of every number inside it.

## Supplied Python code

```python
def sum_of_squares_m_to_n(m, n,total):
    for i in range(m,n+1):
        total += (i ** 2)
    return total
m = int(input())
n = int(input())
total = 0
result = sum_of_squares_m_to_n(m,n,total)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| one to three | '1\n3\n' | '14\n' |
| two to five | '2\n5\n' | '54\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_squares_from_m_to_n_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
