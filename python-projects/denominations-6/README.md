# Denominations

## Question

Write a program that reads an amount and prints how many 1000, 500, 100, 50, 20, 5 and 1 notes it contains, one labelled line per denomination.

## Supplied Python code

```python
A = int(input())
nots = [1000,500,100,50,20,5,1]

for n in nots:
    count = A // n
    print(F"{n}:{count}")
    A %= n
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3888 | `'3888\n'` | `'1000:3\n500:1\n100:3\n50:1\n20:1\n5:3\n1:3\n'` |
| 500 | `'500\n'` | `'1000:0\n500:1\n100:0\n50:0\n20:0\n5:0\n1:0\n'` |
| 12345 | `'12345\n'` | `'1000:12\n500:0\n100:3\n50:0\n20:2\n5:1\n1:0\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_denominations_6.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: Seven labelled lines.
- This is the second supplied project titled "Denominations"; it uses a loop and a different set of denominations from the other one.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
