# Cumulative Average

## Question

Read a count and then that many integers, printing the running average after each one rounded to three decimal places.

## Supplied Python code

```python
N = int(input())
total = 0
for i in range(1,N+1):
    num = int(input())
    total += num
    print(round((total)/i,3))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1, 2, 3 | '3\n1\n2\n3\n' | '1.0\n1.5\n2.0\n' |
| 7 and 8 | '2\n7\n8\n' | '7.0\n7.5\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_cumulative_average.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One running average per input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
