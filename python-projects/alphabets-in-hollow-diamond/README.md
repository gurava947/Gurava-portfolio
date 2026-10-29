# Alphabets in Hollow Diamond

## Question

Read N and print a hollow diamond whose edges step through consecutive letters.

## Supplied Python code

```python
N = int(input())
Alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
count = 0
for i in range(1,N+1):
    left_spaces = (N-i) * (" ")
    if (i == 1):
        first_row = (Alpha[count]+" ")
        print(left_spaces + first_row)
        count += 1
    else:
        print(left_spaces + (Alpha[count]+" ") + 2*(i-2) *(" ") + (Alpha[count+1]+" "))
        count += 2
for j in range(1,N):
    left_spaces = (j) * (" ")
    if (j == N-1):
        first_row = (Alpha[count-3]+" ")
        print(left_spaces + first_row)
        count -= 1
    else:
        print(left_spaces + (Alpha[count-4]+" ") + (N-j-2) * ("  ") + (Alpha[count-3]+" "))
        count -= 2
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | '3\n' | '  A \n B C \nD   E \n B C \n  A \n' |
| N = 2 | '2\n' | ' A \nB C \n A \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabets_in_hollow_diamond.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow diamond of letters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
