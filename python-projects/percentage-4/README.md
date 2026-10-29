# Percentage - 4

## Question

Read a number and print five percent of it when it is under one thousand, and ten percent when it is not.

## Supplied Python code

```python
def calculate_percentage(number):
    return ((5 / 100)*number) if (1000 > number) else ((10 / 100)*number)
        
number = int(input())
result = calculate_percentage (number = number)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| below a thousand | '200\n' | '10.0\n' |
| at a thousand | '1000\n' | '100.0\n' |
| above a thousand | '2000\n' | '200.0\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_percentage_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One number.
- The percentages are divided out, so the answers print as floats.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
