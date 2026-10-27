# Relation between two numbers 2

## Question

Write a program that reads two integers A and B and prints "A < B", "A == B" or "A > B".

## Supplied Python code

```python
A  = int(input())
B  = int(input())
if A < B:
    print("A < B")
elif A == B:
    print("A == B")
elif A > B:
    print("A > B")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 4 versus 9 | `'4\n9\n'` | `'A < B\n'` |
| 9 versus 4 | `'9\n4\n'` | `'A > B\n'` |
| 6 versus 6 | `'6\n6\n'` | `'A == B\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_relation_between_two_numbers_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: A < B, A == B or A > B.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
