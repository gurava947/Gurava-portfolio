# Divisible by Nine

## Question

Read three numbers and print whether any one of them divides by nine.

## Supplied Python code

```python
def check_divisible_by_9(first_number, second_number, third_number):
    if (first_number % 9 == 0 or second_number % 9 == 0 or third_number % 9 == 0):
        value = True
    else:
        value = False
    return value
first_number = int(input())
second_number = int(input())
third_number = int(input())
result = check_divisible_by_9 (first_number , second_number ,third_number)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| middle matches | '5\n9\n11\n' | 'True\n' |
| none match | '1\n2\n4\n' | 'False\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_nine.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Three integers, one per line.
- Output: One boolean.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
