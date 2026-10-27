# Largest Factor of a Number

## Question

Read N and print its largest proper factor.

## Supplied Python code

```python
N = int(input())
for i in range(1,N):
    if (N % i == 0):
        lasgest_factores = i
print(lasgest_factores)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 10 | `'10\n'` | `'5\n'` |
| N = 7 | `'7\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_largest_factor_of_a_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The largest proper factor.
- The loop stops at N-1, so the input 1 leaves the variable unset and raises NameError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
