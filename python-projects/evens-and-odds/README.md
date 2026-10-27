# Evens and Odds

## Question

Read M and N, then print the count of odd numbers followed by the count of even numbers from M to N.

## Supplied Python code

```python
def Evens_and_odd():
    M,N = int(input()),int(input())
    count_odd,count_even = 0,0
    for i in range(M,N+1):
        if (i % 2 == 1):
            count_odd += 1
        else:
            count_even += 1
    print(count_odd)
    print(count_even)
Evens_and_odd()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 1, N = 10 | `'1\n10\n'` | `'5\n5\n'` |
| M = 2, N = 7 | `'2\n7\n'` | `'3\n3\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_evens_and_odds.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: Two lines: odd count then even count.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
