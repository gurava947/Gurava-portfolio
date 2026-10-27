# Weight

## Question

Write a program that reads a weight W. Print "Box is Heavier" when W is at least 100, and "Box is Heavy" when W is below 100.

## Supplied Python code

```python
W = int(input())
if (W >= 100):
    print("Box is Heavier")
elif (W != 100 and W <= 100):
    print("Box is Heavy")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| W = 120 | `'120\n'` | `'Box is Heavier\n'` |
| W = 99 | `'99\n'` | `'Box is Heavy\n'` |
| W = 100 prints Heavier | `'100\n'` | `'Box is Heavier\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_weight.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Box is Heavier or Box is Heavy.
- W = 100 prints "Box is Heavier" because the first branch uses >=.
- The W != 100 condition in the elif is redundant: the first branch already handles 100.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
