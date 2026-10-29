# Rounding Inputs

## Question

Read a count and then that many numbers, printing each one rounded to two decimal places.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    number_of_inputs = float(input())
    print(round(number_of_inputs,2))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| two values | '2\n3.14159\n2.5\n' | '3.14\n2.5\n' |
| one value | '1\n7.005\n' | '7.0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_rounding_inputs.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many numbers.
- Output: One rounded number per input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
