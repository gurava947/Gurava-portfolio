# Armstrong Numbers in Inputs

## Question

Read N, then read N numbers, and print each one that is an Armstrong number.

## Supplied Python code

```python
def Armstrong_Numbers_in_inputs():
    N = int(input())
    for i in range(N):
        Inputs = input()
        power = len(Inputs)
        sum = 0
        for j in Inputs:
            arm = int(j) ** power
            sum += arm
        if (sum == int(Inputs)):
            print(Inputs)
Armstrong_Numbers_in_inputs()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2 numbers: 153 and 9474 | `'2\n153\n9474\n'` | `'153\n9474\n'` |
| 3 numbers: 123, 370, 9474 | `'3\n123\n370\n9474\n'` | `'370\n9474\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_armstrong_numbers_in_inputs.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The Armstrong numbers, one per line.
- Numbers that are not Armstrong numbers are skipped silently.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
