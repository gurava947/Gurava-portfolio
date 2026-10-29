# Shuffle String - 3

## Question

Read a word and a line of positions and print the characters taken from those positions.

## Supplied Python code

```python
def shiff_string(S,N):
    New = ""
    for i in N:
        New += (S[int(i)])
    print(New)
S = input()
N = input().split(" ")
shiff_string(S,N)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| ascending | 'Python\n0 2 4\n' | 'Pto\n' |
| descending | 'Practice\n5 3 1\n' | 'icr\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_shuffle_string_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word then one line of space-separated positions.
- Output: One word.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
