# Sum of N Terms in the Series - 2

## Question

Read X and N and print the sum of the powers X^1 through X^N.

## Supplied Python code

```python
X,N = float(input()),int(input())
total,count  = 0 , 2
for i in range(1,N+1):
    power_in_termes = i
    total += (X ** power_in_termes)
    count_value = count
print(round(total,(count_value+2)))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 2, N = 3 | '2\n3\n' | '14.0\n' |
| X = 1.5, N = 3 | '1.5\n3\n' | '7.125\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_n_terms_in_the_series_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One float X and one integer N.
- Output: One rounded total.
- The rounding argument comes from a value that never changes inside the loop, so the total is always rounded to four decimal places.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
