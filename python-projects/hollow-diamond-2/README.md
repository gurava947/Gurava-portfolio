# Hollow Diamond - 2

## Question

Read N and print a hollow diamond whose rows step through consecutive letters.

## Supplied Python code

```python
n = int(input())
alpha = 65
for row in range(n):
    left_spaces = " " * (n - row - 1) 
    hollow_spaces = " " * (2 * row - 1)
    if row == 0:
        each_row = left_spaces + chr(alpha)
        alpha += 1
    else:
        each_row = left_spaces + chr(alpha) + hollow_spaces + chr(alpha)
        alpha += 1
    print(each_row)
    
alpha -= 2

for row in range(1, n):
    left_spaces = " " * row 
    hollow_spaces = " " * (2 * (n - row - 1) - 1)
    if row == n - 1:
        each_row = left_spaces + chr(alpha)
    else:
        each_row = left_spaces + chr(alpha) + hollow_spaces + chr(alpha)
        alpha -= 1 
    print(each_row)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| n = 4 | '4\n' | '   A\n  B B\n C   C\nD     D\n C   C\n  B B\n   A\n' |
| n = 1 | '1\n' | 'A\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_diamond_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow diamond of letters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
