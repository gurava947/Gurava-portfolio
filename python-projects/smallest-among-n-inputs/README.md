# Smallest among N inputs

## Question

Read a count and print the smallest of the values that follow it.

## Supplied Python code

```python
N = int(input())
smllest_number = 99999
for i in range(N-1):
    num = int(input())
    if (smllest_number > num):
        smllest_number = num
        print(num)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5, 3, 8 | '3\n5\n3\n8\n' | '5\n3\n' |
| 4, 1, 2, 9 | '4\n4\n1\n2\n' | '4\n1\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_smallest_among_n_inputs.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: A running list of new minima.
- The loop stops one short of the count, so the final value is never read, and it prints only when a new minimum appears, so the output is a series of records rather than one smallest value.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
