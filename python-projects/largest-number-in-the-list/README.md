# Largest Number in the List

## Question

Read space-separated integers and print the largest.

## Supplied Python code

```python
N = input().split()
list_values = []
for i in N:
    i = int(i)
    list_values += [i]
print(max(list_values))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| four values | '3 17 9 4\n' | '17\n' |
| repeated maximum | '5 5 2\n' | '5\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_largest_number_in_the_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated integers.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
