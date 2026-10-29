# Cumulative Sum

## Question

Read a count and then that many integers, printing the running total after each one.

## Supplied Python code

```python
N = int(input())
add = 0
for i in range(N):
    num = int(input())
    add += num 
    print(add)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2, 4, 6 | '3\n2\n4\n6\n' | '2\n6\n12\n' |
| 10 and -3 | '2\n10\n-3\n' | '10\n7\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_cumulative_sum_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One running total per input.
- The supplied material carries this second Cumulative Sum snippet under the same title as the first; both are preserved.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
