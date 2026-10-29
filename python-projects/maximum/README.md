# Maximum

## Question

Read a count and then that many integers, printing the largest value seen so far after each one.

## Supplied Python code

```python
N = int(input())
maximum = None
for i in range(N):
    A = int(input())
    if maximum is None or A > maximum:
        maximum = A
    print(maximum)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3, 1, 4 | '3\n3\n1\n4\n' | '3\n3\n4\n' |
| 5 and 5 | '2\n5\n5\n' | '5\n5\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_maximum.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One running maximum per input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
