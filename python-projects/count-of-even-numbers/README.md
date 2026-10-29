# Count of Even Numbers

## Question

Read space-separated numbers and print how many of them are even.

## Supplied Python code

```python
def get_even_numbers_count(numbers,count):
    for i in numbers:
        num = int(i)
        if (num % 2 == 0):
            count += 1
    return count
numbers = input().split()
count = 0
result = get_even_numbers_count(numbers,count)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three even | '1 2 3 4 6\n' | '3\n' |
| none even | '1 3 5\n' | '0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_count_of_even_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated numbers.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
