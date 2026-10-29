# Factors of a Number - 3

## Question

Read a number and print all of its factors on one line.

## Supplied Python code

```python
def factors_of_n(number):
    factors = ""
    for i in range(1,number+1):
        if (number % i == 0):
            factors += str(i) + " "
    return factors
number = int(input())
result = factors_of_n(number)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| six | '6\n' | '1 2 3 6 \n' |
| ten | '10\n' | '1 2 5 10 \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_factors_of_a_number_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One line of factors.
- Each factor is appended with a trailing space, so the printed line ends with one.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
