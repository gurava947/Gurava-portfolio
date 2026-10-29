# Compare Numbers - 11

## Question

Read two numbers and print whether both exceed one hundred while the first stays the smaller.

## Supplied Python code

```python
def compare_numbers(first_number, second_number):
    if ((second_number > 100 < first_number)) and (first_number < second_number):
        value = True
    else:
        value = False
    return value
first_number = int(input())
second_number = int(input())
is_true = compare_numbers (first_number = first_number , second_number = second_number)
print(is_true)
# print(first_number < second_number)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| both above | '150\n200\n' | 'True\n' |
| first larger | '200\n150\n' | 'False\n' |
| both below | '50\n80\n' | 'False\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_compare_numbers_11.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One boolean.
- The chain `second_number > 100 < first_number` compares one hundred against the first number as well, so both have to clear it. The trailing comment keeps the simpler test the exercise started from.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
