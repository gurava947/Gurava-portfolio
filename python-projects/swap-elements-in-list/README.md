# Swap Elements in List

## Question

Read two indices and print the fixed list with those two positions exchanged.

## Supplied Python code

```python
L = [1, "two", 9, 5.09, "Three", -558, "four", -93.7, "six"]
#Write your code here
M,N = int(input()),int(input())
# print(L)
change_1 = L[M]
change_2 = L[N] 
# print(change_1)
# print(change_2)
L[M] = change_2
L[N] = change_1
print(L)

# swap = L[M]
# L[M] = L[N]
# L[N] = swap
# print(L)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 0 and 8 | '0\n8\n' | "['six', 'two', 9, 5.09, 'Three', -558, 'four', -93.7, 1]\n" |
| 1 and 3 | '1\n3\n' | "[1, 5.09, 9, 'two', 'Three', -558, 'four', -93.7, 'six']\n" |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_swap_elements_in_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integer indices.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
