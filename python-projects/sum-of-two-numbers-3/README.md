# Sum of two numbers - 3

## Question

Read two integers and print their sum.

## Supplied Python code

```python
def add(arg_1, arg_2):
    print(arg_1 + arg_2)
a = int(input())
b = int(input())
add(arg_1 = a , arg_2 = b)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| both positive | '10\n20\n' | '30\n' |
| one negative | '5\n-3\n' | '2\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_two_numbers_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
