# Cumulative Sum

## Question

Read a count and then that many integers, printing the running total after each one.

## Supplied Python code

```python
N = int(input())
adding_value = 0
for i in range(N):
    num = int(input())
    adding_value += num
    print(adding_value)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1, 2, 3 | '3\n1\n2\n3\n' | '1\n3\n6\n' |
| 5 and -2 | '2\n5\n-2\n' | '5\n3\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_cumulative_sum.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One running total per input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
