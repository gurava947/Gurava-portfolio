# Modifying List

## Question

Read an index and a value, then print the fixed list with that position replaced.

## Supplied Python code

```python
L = [1, 20, 33, 45, 520, 64, 71, 852, 9999, 101010]

# Write your code here

M,N = int(input()),int(input())
L[M] = N
print(L)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| index 1 to 99 | '1\n99\n' | '[1, 99, 33, 45, 520, 64, 71, 852, 9999, 101010]\n' |
| index 0 to 5 | '0\n5\n' | '[5, 20, 33, 45, 520, 64, 71, 852, 9999, 101010]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_modifying_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One index and one value.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
