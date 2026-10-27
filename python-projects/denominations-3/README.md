# Denominations - 3

## Question

Write a program that reads an amount and prints how many 500, 50, 10 and 1 notes it contains on a single labelled line.

## Supplied Python code

```python
A = int(input())
divied_in_500_substring = A - (500 * (A // 500))
divied_in_50_substring = divied_in_500_substring - ((divied_in_500_substring // 50) * 50)
divied_in_10_substring = divied_in_50_substring - (((divied_in_50_substring // 10)) * 10)
print("500: " +str((A // 500))+" " + "50: " +str((divied_in_500_substring // 50))+" " + "10: " +str(((divied_in_50_substring // 10)))+" " + "1: " +str(divied_in_10_substring))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1234 | `'1234\n'` | `'500: 2 50: 4 10: 3 1: 4\n'` |
| 578 | `'578\n'` | `'500: 1 50: 1 10: 2 1: 8\n'` |
| 999 | `'999\n'` | `'500: 1 50: 9 10: 4 1: 9\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_denominations_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: One labelled line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
