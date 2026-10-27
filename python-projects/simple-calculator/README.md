# Simple Calculator

## Question

Write a program that reads an operator, then two integers, and prints the result of that operation.

## Supplied Python code

```python
o = input()
A = int(input())
B = int(input())
if ("+" == o):
    print(A+B)
elif ("-" == o):
    print(A-B)
elif ("*" == o):
    print(A*B)
elif ("/" == o):
    print(A/B)
elif ("%" == o):
    print(A%B)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 4 + 6 | `'+\n4\n6\n'` | `'10\n'` |
| 3 * 4 | `'*\n3\n4\n'` | `'12\n'` |
| 10 / 4 | `'/\n10\n4\n'` | `'2.5\n'` |
| 10 % 4 | `'%\n10\n4\n'` | `'2\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_simple_calculator.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: An operator, then two integers, one per line.
- Output: The result, or empty output for an unknown operator.
- An unknown operator matches no branch and prints nothing.
- Dividing by zero raises ZeroDivisionError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
