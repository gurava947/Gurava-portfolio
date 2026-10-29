# Divisible by 3

## Question

Read space-separated numbers and print those divisible by 3 as a list.

## Supplied Python code

```python
S = input()
divisible_3_numbers = []
for i in S.split():
    Num = int(i)
    if (Num % 3 == 0):
        divisible_3_numbers += [Num]
print(divisible_3_numbers)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| some match | '1 2 3 4 5 6 9\n' | '[3, 6, 9]\n' |
| none match | '1 2 4 5\n' | '[]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated numbers.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
