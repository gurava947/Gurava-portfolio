# Numbers in Inverted Hollow Right Ang

## Question

Read M and N and print an N-row right-aligned inverted hollow triangle numbered from M.

## Supplied Python code

```python
def Numbers_in_Inverted_hollow_Spaces():
    M,N = int(input()),int(input())
    start_num = (M-1)
    for count in range(N):
        each_count = (N - count)
        start_num += each_count
    for row in range(1,N+1):
        left_sapces = (row-1) * ("  ")
        if (row == 1):
            firt_row = ""
            for i in range(N):
                firt_row += str(start_num) + " "
                start_num -= 1
            print(firt_row)
        elif (row == N):
            last_row = str(M) + " "
            print(left_sapces + last_row)
        else:
            each_row = str(start_num) + " "
            hollow_spaces = (N - row -1) * ("  ")
            each_row += hollow_spaces
            start_num -= int(len(hollow_spaces)/2) + 1
            each_row += str(start_num) + " "
            start_num -= 1
            print(left_sapces + each_row)
Numbers_in_Inverted_hollow_Spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 3, N = 3 | `'3\n3\n'` | `'8 7 6 \n  5 4 \n    3 \n'` |
| M = 4, N = 4 | `'4\n4\n'` | `'13 12 11 10 \n  9   7 \n    6 5 \n      4 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_hollow_right_ang.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: A right-aligned inverted hollow triangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
