# Alphabets in Hollow M Shape

## Question

Read N and print the first N letters of the alphabet arranged as a hollow M.

## Supplied Python code

```python
N = int(input())
Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1,N+1):
    left_row = (N-i) * (" ")
    if (i == 1):
        first_row = ""
        first_row += (Alpha[i-1] + " ")
        print(left_row + first_row + (N-i)* ("  ") + first_row)
    else:
        last_row = ""
        hollow_sapces = (i-2) * ("  ")
        last_row += (Alpha[i-1] + " ") + hollow_sapces +  (Alpha[i-1] + " ")
        print(left_row + last_row + (N-i)* ("  ") + last_row)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | '3\n' | '  A     A \n B B   B B \nC   C C   C \n' |
| N = 4 | '4\n' | '   A       A \n  B B     B B \n C   C   C   C \nD     D D     D \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabets_in_hollow_m_shape.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow M of letters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
