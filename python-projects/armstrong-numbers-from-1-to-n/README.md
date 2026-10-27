# Armstrong Numbers from 1 to N

## Question

Read N and print every number from 1 to N that equals the sum of its digits each raised to the digit count.

## Supplied Python code

```python
def ArmstrongNumber_from_1_To_N():
    N = int(input())
    for Number in range(1,N+1):
        Digits = 0
        Number = str(Number)
        power = len(Number)
        for A in Number:
            A = int(A)
            Digits += A ** power
        if(Digits == int(Number)):
            print(Number)
ArmstrongNumber_from_1_To_N()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 10 | `'10\n'` | `'1\n2\n3\n4\n5\n6\n7\n8\n9\n'` |
| N = 500 | `'500\n'` | `'1\n2\n3\n4\n5\n6\n7\n8\n9\n153\n370\n371\n407\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_armstrong_numbers_from_1_to_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: One Armstrong number per line.
- Every single-digit number is printed because a one-digit number always equals itself to the first power.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
