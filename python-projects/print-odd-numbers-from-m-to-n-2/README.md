# Print Odd Numbers from M to N - 2

## Question

Read a range and print the odd numbers inside it on one line.

## Supplied Python code

```python
def get_odd_numbers_in_range(start_number, end_number,odd):
    for i in range(start_number,end_number+1):
        if (i % 2 == 1):
            odd += str(i) + " "
    return odd
start_number = int(input())
end_number = int(input())
odd = ""
odd_numbers = get_odd_numbers_in_range(start_number,end_number,odd)
print(odd_numbers)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| one to ten | '1\n10\n' | '1 3 5 7 9 \n' |
| two to eight | '2\n8\n' | '3 5 7 \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_odd_numbers_from_m_to_n_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One line of odd numbers.
- Each odd number is appended with a trailing space, so the printed line ends with one.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
