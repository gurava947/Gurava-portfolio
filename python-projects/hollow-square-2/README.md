# Hollow Square - 2

## Question

Read N and print a hollow square: a border of '+' and '-' tokens with '|' interior rows.

## Supplied Python code

```python
N = int(input())
def HellowSpaces(N):
    for i in range(N+2):
        if (i == 0 or i == N+1):
            print("+ " + N * ("- ") + "+ ")
        else:
            print("| " + (N * 2) * (" ") + "| ")
HellowSpaces(N)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'+ - - - + \n|       | \n|       | \n|       | \n+ - - - + \n'` |
| N = 4 | `'4\n'` | `'+ - - - - + \n|         | \n|         | \n|         | \n|         | \n+ - - - - + \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_square_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: N+2 output rows forming a hollow square.
- The interior row is 2N spaces wide because the code multiplies N by 2.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
