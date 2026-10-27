# Print the Score

## Question

Write a program that reads D and prints the score: D itself when D is less than 10, otherwise 10 + (D - 10) * 3.

## Supplied Python code

```python
D = int(input())
if D < 10 :
    print(D)
else:
    print(10 + (D - 10) *3)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| D = 7 | `'7\n'` | `'7\n'` |
| D = 10 | `'10\n'` | `'10\n'` |
| D = 12 | `'12\n'` | `'16\n'` |
| D = 20 | `'20\n'` | `'40\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_score.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: The calculated score.
- The supplied snippet is byte-identical to the supplied "Cube of a Number" snippet, so that project is held until corrected code arrives.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
