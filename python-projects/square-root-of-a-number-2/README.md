# Square Root of a Number - 2

## Question

Write a program that reads A and B and prints "Square root of A is equal to B" when A ** 0.5 equals B, otherwise "Square root of A is not equal to B".

## Supplied Python code

```python
A = int(input())
B = int(input())
if  (A ** 0.5 == B):
    print("Square root of A is equal to B")
else:
    print("Square root of A is not equal to B")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Square root of 9 is 3 | `'9\n3\n'` | `'Square root of A is equal to B\n'` |
| Square root of 25 is 5 | `'25\n5\n'` | `'Square root of A is equal to B\n'` |
| Square root of 8 is not 3 | `'8\n3\n'` | `'Square root of A is not equal to B\n'` |
| Square root of 10 is not 4 | `'10\n4\n'` | `'Square root of A is not equal to B\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_square_root_of_a_number_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two numbers, one per line.
- Output: One of two comparison messages.
- Because the comparison is exact, a rounded decimal for an irrational root will print the not-equal message.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
