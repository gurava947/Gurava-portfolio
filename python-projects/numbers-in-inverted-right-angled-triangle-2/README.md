# Numbers in Inverted Right Angled Triangle - 2

## Question

Read N and print N rows of decreasing numbers starting from N*(N+1)/2 with growing left padding.

## Supplied Python code

```python
def Number_in_inverted_Right__Angle_Triangle():
    N = int(input())
    K = N * (N+1)//2
    for i in range(1,N+1):
        spaces = (i-1) * ("  ")
        print(spaces,end="")
        for j in range(N-i+1):
            print(K,end=" ")
            K -= 1
        print()
Number_in_inverted_Right__Angle_Triangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'10 9 8 7 \n  6 5 4 \n    3 2 \n      1 \n'` |
| N = 3 | `'3\n'` | `'6 5 4 \n  3 2 \n    1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_right_angled_triangle_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A right-aligned descending triangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
