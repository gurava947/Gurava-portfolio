# Average of Numbers from M to N

## Question

Read M and N, then print the sum of every integer in that range followed by its average.

## Supplied Python code

```python
M,N = int(input()),int(input())
value,count = 0,0
for i in range(M,N+1):
    value += i
    count += 1
print(value),print(value/count)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1 to 5 | '1\n5\n' | '15\n3.0\n' |
| 10 to 20 | '10\n20\n' | '165\n15.0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_average_of_numbers_from_m_to_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: The sum, then the average.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
