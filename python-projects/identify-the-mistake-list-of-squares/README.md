# Identify the Mistake - List of Squares

## Question

Read comma-separated numbers and print them squared as a list.

## Supplied Python code

```python
def get_list(string_a):
    list_a = string_a.split(',')
    len_list_a = len(list_a)
    for i in range(len_list_a):
        list_a[i] = int(list_a[i]) ** 2
    return list_a
string_a = input()
numbers_list = get_list(string_a)
print(numbers_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three values | '1,2,3\n' | '[1, 4, 9]\n' |
| two values | '4,5\n' | '[16, 25]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_identify_the_mistake_list_of_squares.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One comma-separated line of numbers.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
