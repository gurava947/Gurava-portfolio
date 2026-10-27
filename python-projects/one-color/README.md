# One Color

## Question

Read a string of R and G characters and print the smaller of the two counts.

## Supplied Python code

```python
def oneColor():
    N = input()
    R,G = 0,0
    for i in N:
        if (i == "R"):
            R += 1
        else:
            G += 1
    if (R < G):
        print(R)
    else:
        print(G)
oneColor()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| RRGG | `'RRGG\n'` | `'2\n'` |
| RRRR | `'RRRR\n'` | `'0\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_one_color.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string of R and G characters.
- Output: The smaller count.
- Any character other than uppercase R is counted as G, including lowercase r.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
