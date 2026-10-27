# Digit 6

## Question

Read N and print the digit 6 using stars, five rows tall.

## Supplied Python code

```python
N = int(input())
for i in range(1,N+1):
    if (i == 1 or i == N):
        print(N * ("* "))
    else:
        print("* ")
for j in range(1,N):
    if (j == N-1):
        print(N * ("* "))
    else:
        print("* " + (N - 2)*("  ") + "* ")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'* * * * \n* \n* \n* * * * \n*     * \n*     * \n* * * * \n'` |
| N = 3 | `'3\n'` | `'* * * \n* \n* * * \n*   * \n* * * \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_digit_6.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A star drawing of the digit 6.
- Middle rows of the lower loop print only a single left star, so the lower half is not a closed loop of the digit.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
