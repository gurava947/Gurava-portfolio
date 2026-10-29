# Sum of N terms in Harmonic series

## Question

Read N and print the sum of the first N terms of the harmonic series, rounded to two decimal places.

## Supplied Python code

```python
N = int(input())
value = 0
for i in range(1,N+1):
    value += 1/i
print(round(value,2))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 5 | '5\n' | '2.28\n' |
| N = 1 | '1\n' | '1.0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_n_terms_in_harmonic_series.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: One rounded total.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
