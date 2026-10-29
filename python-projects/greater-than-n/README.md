# Greater than N

## Question

Read a threshold and print the values in the fixed list that are greater than it.

## Supplied Python code

```python
num_list = [1, 6, 32, 93, 71, -20, 30, -90, 50]
# Write your code here
New_list = []
graterthan_value = int(input())
for i in num_list:
    if (int(i) > graterthan_value):
        New_list = New_list + [i]
print(New_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| threshold 30 | '30\n' | '[32, 93, 71, 50]\n' |
| threshold -100 | '-100\n' | '[1, 6, 32, 93, 71, -20, 30, -90, 50]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_greater_than_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer threshold.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
