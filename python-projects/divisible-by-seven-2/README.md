# Divisible by Seven - 2

## Question

Read a number and print whether it divides by seven.

## Supplied Python code

```python
def divisible_by_seven(arg_1):
    result = True if (n % 7 == 0) else False
    return result
n = int(input())
Divisible = divisible_by_seven(arg_1 = n)
print(Divisible)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| multiple | '14\n' | 'True\n' |
| not a multiple | '15\n' | 'False\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_seven_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One boolean.
- `divisible_by_seven` tests the module-level `n` instead of its own `arg_1`.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
