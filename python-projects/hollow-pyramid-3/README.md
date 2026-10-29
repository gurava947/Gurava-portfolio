# Hollow Pyramid - 3

## Question

Read N and print a hollow pyramid drawn with pipes and slashes.

## Supplied Python code

```python
N = int(input())
print("| ")
for i in range(2,N+1):
    if (i == 0):
        pass
    else:
        print("|" + (i-2) * (" ") + " \ ")
for j in range(2,N+1):
    if (j == 0):
        pass
    else:
        print("|" + (N - j) * (" ") + " / ")
print("| ")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | '4\n' | '| \n| \\ \n|  \\ \n|   \\ \n|   / \n|  / \n| / \n| \n' |
| N = 2 | '2\n' | '| \n| \\ \n| / \n| \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_pyramid_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow pyramid.
- The right-hand edge is written as "\ ", which is an invalid escape sequence; Python 3.12 and newer print a SyntaxWarning for it before the drawing.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
