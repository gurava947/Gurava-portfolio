# Alphabets in Hollow Rectangle

## Question

Read M and N and print a hollow rectangle whose border letters advance through the alphabet.

## Supplied Python code

```python
M,N = int(input()),int(input())
count = 0
string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1,M+1):
    for j in range(1,N+1):
        if (i == 1 or i == M or j == 1 or j == N):
            print(string[count],end=" ")
            count += 1
        else:
            print(" ",end=" ")
            count += 1
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 3, N = 4 | `'3\n4\n'` | `'A B C D \nE     H \nI J K L \n'` |
| M = 4, N = 3 | `'4\n3\n'` | `'A B C \nD   F \nG   I \nJ K L \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabets_in_hollow_rectangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: A hollow alphabet rectangle.
- Letters advance through the full row and column path, including positions hidden inside the hollow area.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
