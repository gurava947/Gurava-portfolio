# Numbers in Inverted Hollow Pyramid

## Question

Read S and N and print an N-row inverted hollow pyramid numbered from S.

## Supplied Python code

```python
def Numbers_in_inverted_Hollow_spaces():
    S,N = int(input()),int(input())
    start_num = (S)
    for row in range(1,N+1):
        left_spaces  = (row - 1) * (" ")
        if (row == 1):
            first_row = ""
            for i in range(N):
                first_row += str(start_num) + " "
                start_num += 1
            print(first_row)
        elif(row == N):
            last_row = str(start_num) + " "
            print(left_spaces + last_row)
        else:
            each_row = str(start_num) + " "
            hollow_spaces = (N - row -1) * ("  ")
            each_row += hollow_spaces 
            start_num += int(len(hollow_spaces)/2) + 1
            each_row +=  str(start_num) + " "
            start_num += 1
            print(left_spaces + each_row)
Numbers_in_inverted_Hollow_spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| S = 3, N = 4 | `'3\n4\n'` | `'3 4 5 6 \n 7   9 \n  10 11 \n   12 \n'` |
| S = 1, N = 3 | `'1\n3\n'` | `'1 2 3 \n 4 5 \n  6 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_hollow_pyramid_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers S and N.
- Output: An inverted hollow numbered pyramid.
- This title also appears earlier with a different implementation; the two are separate entries.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
