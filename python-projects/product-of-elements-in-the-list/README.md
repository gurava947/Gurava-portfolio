# Product of Elements in the List

## Question

Read space-separated integers and print their product.

## Supplied Python code

```python
N = input().split()
mul = 1
for i in N:
    i = int(i)
    mul *= i
print(mul)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three values | '2 3 4\n' | '24\n' |
| contains zero | '6 0 7\n' | '0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_product_of_elements_in_the_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated integers.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
