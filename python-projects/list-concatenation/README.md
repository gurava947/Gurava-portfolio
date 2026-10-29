# List Concatenation

## Question

Read a number and print it added to the front of the fixed list [10, 20, 40, 100], then added to the back.

## Supplied Python code

```python
num_list =  [10, 20, 40, 100]
n = int(input())
first_list = [n] + num_list
second_list = num_list +  [n]

print(first_list)
print(second_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| n = 5 | '5\n' | '[5, 10, 20, 40, 100]\n[10, 20, 40, 100, 5]\n' |
| n = 0 | '0\n' | '[0, 10, 20, 40, 100]\n[10, 20, 40, 100, 0]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_list_concatenation.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Two lists.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
