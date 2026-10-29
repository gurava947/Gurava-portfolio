# First and Last Elements of List

## Question

Read a count and then that many integers, printing the first two followed by the last two.

## Supplied Python code

```python
New_list = []
N = int(input())
for i in range(N):
    Number = int(input())
    New_list += [Number]
print(New_list[:2] + New_list[-2:])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| four values | '4\n1\n2\n3\n4\n' | '[1, 2, 3, 4]\n' |
| six values | '6\n5\n4\n3\n2\n1\n0\n' | '[5, 4, 1, 0]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_and_last_elements_of_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
