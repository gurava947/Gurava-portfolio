# First 3 and Last 3 Elements of List

## Question

Read a count and then that many values, printing the first three followed by the last three.

## Supplied Python code

```python
N = int(input())
New_list = []
for i in range(N):
    list_char = input()
    New_list += [list_char]
print(New_list[:3] + New_list[N-3:])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| six values | '6\na\nb\nc\nd\ne\nf\n' | "['a', 'b', 'c', 'd', 'e', 'f']\n" |
| three values | '3\nx\ny\nz\n' | "['x', 'y', 'z', 'x', 'y', 'z']\n" |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_3_and_last_3_elements_of_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many strings.
- Output: One list.
- The slice for the tail is taken from the count minus three, so a list of exactly three values repeats all of them.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
