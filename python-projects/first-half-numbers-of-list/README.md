# First half Numbers of List

## Question

Read space-separated numbers and print the first half of them as a list of integers.

## Supplied Python code

```python
Numbers = input().split()
length = len(Numbers)
for each_num_index in range(length):
    Numbers[each_num_index] = int(Numbers[each_num_index])

if (length % 2 == 0):
    half_list_length = length // 2
else:
    half_list_length = (length // 2) + 1
first_half_list = Numbers[:half_list_length]
print(first_half_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| even count | '1 2 3 4\n' | '[1, 2]\n' |
| odd count | '1 2 3\n' | '[1, 2]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_half_numbers_of_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated numbers.
- Output: One list of integers.
- With an odd count the middle number belongs to the first half.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
