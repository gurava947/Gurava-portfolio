# First Prime Number

## Question

Read N, then read N numbers, and print the first prime one.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    factores = 0
    Num = int(input())
    for number in range(1,Num+1):
        if (Num % number == 0):
            factores += 1
    if (factores == 2):
        print(Num)
        break
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 4, 6, 7, 8 | `'4\n4\n6\n7\n8\n'` | `'7\n'` |
| 4, 6, 8 | `'3\n4\n6\n8\n'` | `''` |

A case with an empty expected stdout means the program prints nothing for that input; the comparison expects an empty string.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_prime_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The first prime number, or nothing.
- Prints nothing when none of the inputs is prime. 1 has one divisor, so it is not prime here.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
