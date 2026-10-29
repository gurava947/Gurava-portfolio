# Division with 17

## Question

Read a count and then that many integers, printing each one divided by 17 with the remainder dropped.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    num = int(input())
    print( (num // 17))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 34 and 50 | '2\n34\n50\n' | '2\n2\n' |
| 17 | '1\n17\n' | '1\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_division_with_17.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One quotient per input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
