# Alphabets in Inverted Right Angled T

## Question

Read N and print rows of the first N letters, removing one letter per row.

## Supplied Python code

```python
N = int(input())
string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(N):
    each_row = ""
    for j in range(N-i):
        each_row += string[j] +" "
    print(each_row)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'A B C D \nA B C \nA B \nA \n'` |
| N = 3 | `'3\n'` | `'A B C \nA B \nA \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabets_in_inverted_right_angled_t.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A shrinking alphabet triangle.
- The supplied title is truncated in the source document; it is stored verbatim.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
