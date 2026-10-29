# Smallest Number in the List

## Question

Read space-separated integers and print the smallest.

## Supplied Python code

```python
S = input()
split_num = S.split()
new_list = []
for i in split_num:
     new_list += [int(i)]
print(min(new_list))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| five values | '5 3 9 1 7\n' | '1\n' |
| four values | '42 17 8 23\n' | '8\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_smallest_number_in_the_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated integers.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
