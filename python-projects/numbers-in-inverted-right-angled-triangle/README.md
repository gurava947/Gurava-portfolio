# Numbers in Inverted Right Angled Triangle

## Question

Read N and print rows containing 1 up to a decreasing limit.

## Supplied Python code

```python
def Number_In_Inverted_right_angle():
    N = int(input())
    for i in range(1,N+1):
        for j in range (N-i+1):
            print(j+1 ,end=" ")
        print()
Number_In_Inverted_right_angle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'1 2 3 4 \n1 2 3 \n1 2 \n1 \n'` |
| N = 3 | `'3\n'` | `'1 2 3 \n1 2 \n1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_right_angled_triangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A shrinking triangle of counting numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
