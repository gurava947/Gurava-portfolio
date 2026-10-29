# Average of Given Numbers

## Question

Read space-separated integers and print their average rounded to two places.

## Supplied Python code

```python
N = input().split()
add = 0
for i in N:
    i = int(i)
    add += i
print(round(add/len(N),2))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| whole average | '10 20 30\n' | '20.0\n' |
| rounded average | '1 2 3 4\n' | '2.5\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_average_of_given_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated integers.
- Output: One number.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
