# Numbers in Inverted Hollow Right An

## Question

Read N and print an N-row inverted hollow triangle numbered from 1.

## Supplied Python code

```python
def Numbers_in_Inverted_Hollow_Right_Angle_Triangle():
    N = int(input())
    start_number = 1
    for row in range(1,N+1):
        if (row == 1):
            First_row = ""
            for column in range(N):
                First_row += str(start_number) + " "
                start_number += 1
            print(First_row)
        elif(row == N):
            last_row = str(start_number) + " "
            print(last_row)
        else:
            each_row = str(start_number) + " "
            hollow_spsces = (N - row -1) * ("  ")
            each_row += hollow_spsces
            start_number += int(len(hollow_spsces)/2) + 1
            each_row += str(start_number) + " "
            start_number += 1
            print(each_row)
Numbers_in_Inverted_Hollow_Right_Angle_Triangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'1 2 3 4 \n5   7 \n8 9 \n10 \n'` |
| N = 3 | `'3\n'` | `'1 2 3 \n4 5 \n6 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_hollow_right_an_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: An inverted hollow number triangle.
- The same truncated title appears twice in the source document with different code; this entry keeps the second copy.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
