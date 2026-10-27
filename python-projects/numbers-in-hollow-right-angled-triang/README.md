# Numbers in Hollow Right Angled Triang

## Question

Read S and N and print an N-row hollow triangle whose values start at S and increase.

## Supplied Python code

```python
S,N =int(input()),int(input())
start_number = S 
for i in range(1,N+1):
    if (i == N):
        last_row = ""
        for j in range(N):
            start_number += 1
            last_row += str(start_number) + (" ")
        print(last_row)
    elif(i == 1):
        first_row = str(start_number) + (" ")
        print(first_row)
    else:
        start_number += 1
        each_row = str(start_number) + (" ") 
        hollo_spaces = (i - 2) * ("  ")
        each_row += hollo_spaces
        start_number += 1
        each_row += str(start_number) + (" ")
        print(each_row)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| S = 3, N = 3 | `'3\n3\n'` | `'3 \n4 5 \n6 7 8 \n'` |
| S = 7, N = 4 | `'7\n4\n'` | `'7 \n8 9 \n10   11 \n12 13 14 15 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_right_angled_triang.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers S and N.
- Output: A hollow numbered triangle.
- The supplied title is truncated in the source document; it is stored verbatim.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
