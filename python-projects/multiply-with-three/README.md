# Multiply with Three

## Question

Read a number and print it multiplied by three.

## Supplied Python code

```python
def multiply_with_three(arg_1):
    mul = 3 * n
    print(mul)

n = int(input())
multiply_with_three(n)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| five | '5\n' | '15\n' |
| twelve | '12\n' | '36\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_multiply_with_three.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One integer.
- `multiply_with_three` never reads its own parameter and multiplies the module-level `n` instead, so the call only works because `n` is assigned first.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
