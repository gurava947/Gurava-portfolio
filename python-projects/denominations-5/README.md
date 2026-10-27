# Denominations - 5

## Question

Write a program that reads an amount and prints how many 2000, 500, 200, 50, 20, 5, 2 and 1 notes it contains on a single labelled line.

## Supplied Python code

```python
A = int(input())
find_on_main_value_2000 = (A - ((A // 2000) * 2000))
find_on_main_value_500 = (find_on_main_value_2000 - ((find_on_main_value_2000 // 500) * 500))
find_on_main_value_200 = (find_on_main_value_500 - ((find_on_main_value_500 // 200) * 200))
find_on_main_value_50 = find_on_main_value_200 - ((find_on_main_value_200 // 50) * 50)
find_on_main_value_20 = (find_on_main_value_50 - ((find_on_main_value_50 // 20) * 20))
find_on_main_value_5 = (find_on_main_value_20 - ((find_on_main_value_20 // 5) * 5))
find_on_main_value_2 = (find_on_main_value_5 - ((find_on_main_value_5 // 2) * 2))
print("2000:"+str((A // 2000))+" "+"500:"+str(int(find_on_main_value_2000 // 500))+" "+"200:"+str((find_on_main_value_500 // 200))+" "+"50:"+str((find_on_main_value_200 // 50))+" "+"20:"+str((find_on_main_value_50 // 20))+" "+"5:"+str((find_on_main_value_20 // 5))+" "+"2:"+str((find_on_main_value_5 // 2))+" "+"1:"+str((find_on_main_value_2 // 1)))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3888 | `'3888\n'` | `'2000:1 500:3 200:1 50:3 20:1 5:3 2:1 1:1\n'` |
| 2500 | `'2500\n'` | `'2000:1 500:1 200:0 50:0 20:0 5:0 2:0 1:0\n'` |
| 9876 | `'9876\n'` | `'2000:4 500:3 200:1 50:3 20:1 5:1 2:0 1:1\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_denominations_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: One labelled line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
