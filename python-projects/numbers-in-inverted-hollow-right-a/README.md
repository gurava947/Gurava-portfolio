# Numbers in Inverted Hollow Right A

## Question

Read N and print an N-row inverted hollow triangle whose values count down from the triangular number.

## Supplied Python code

```python
def Numbers_in_Inverted_Hollow_spaces():
    N = int(input())
    start_number = 0
    for count in range(N):
        each_count = (N - count)
        start_number += each_count
    for row in range(1,N+1):
        if (row == 1):
            first_row = ""
            for i in range(N):
                first_row += str(start_number) + " "
                start_number -= 1
            print(first_row)
        elif(row == N):
            last_row = str(start_number) + " "
            print(last_row)
        else:
             middle_row = str(start_number) + " "
             hollow_spaces = (N - row - 1) * ("  ")
             middle_row += hollow_spaces
             start_number -= int(len(hollow_spaces)/2) + 1
             middle_row += str(start_number) + " "
             start_number -= 1
             print(middle_row)
Numbers_in_Inverted_Hollow_spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'10 9 8 7 \n6   4 \n3 2 \n1 \n'` |
| N = 3 | `'3\n'` | `'6 5 4 \n3 2 \n1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_hollow_right_a.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: An inverted hollow number triangle.
- The supplied title is truncated in the source document; it is stored verbatim.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
