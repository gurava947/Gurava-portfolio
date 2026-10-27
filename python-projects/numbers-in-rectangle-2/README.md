# Numbers in Rectangle - 2

## Question

Read X and Y and print X rows of Y numbers, counting up without resetting.

## Supplied Python code

```python
def Number_in_ranctangel():
    X = int(input())
    Y = int(input())
    K = 0
    for i in range(X):
        for j in range(Y):
            K += 1
            print(K,end=" ")
        print()
Number_in_ranctangel()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 4 | `'3\n4\n'` | `'1 2 3 4 \n5 6 7 8 \n9 10 11 12 \n'` |
| X = 2, Y = 3 | `'2\n3\n'` | `'1 2 3 \n4 5 6 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_rectangle_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A rectangle of increasing numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
