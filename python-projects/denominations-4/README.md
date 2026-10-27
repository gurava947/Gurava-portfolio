# Denominations - 4

## Question

Write a program that reads an amount and prints the number of 100, 50, 20 and 10 notes, one labelled line each.

## Supplied Python code

```python
A = int(input())
Note_100_Notes_rupes_substcting = A - ( int(A / 100) * 100)
Note_50_Notes_rupes_substcting = Note_100_Notes_rupes_substcting - (int(Note_100_Notes_rupes_substcting / 50) * 50)
Note_20_Notes_rupes_substcting =Note_50_Notes_rupes_substcting - (int(Note_50_Notes_rupes_substcting / 20) * 20)
print("100 Notes: " + str( int(A / 100))),print("50 Notes: " + str(int(Note_100_Notes_rupes_substcting / 50))),print("20 Notes: " + str(int(Note_50_Notes_rupes_substcting / 20))),print("10 Notes: " + str( int(Note_20_Notes_rupes_substcting/10)))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1380 | `'1380\n'` | `'100 Notes: 13\n50 Notes: 1\n20 Notes: 1\n10 Notes: 1\n'` |
| 260 | `'260\n'` | `'100 Notes: 2\n50 Notes: 1\n20 Notes: 0\n10 Notes: 1\n'` |
| 999 | `'999\n'` | `'100 Notes: 9\n50 Notes: 1\n20 Notes: 2\n10 Notes: 0\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_denominations_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: Four labelled lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
