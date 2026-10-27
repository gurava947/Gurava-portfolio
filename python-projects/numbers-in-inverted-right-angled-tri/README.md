# Numbers in Inverted Right Angled Tri

## Question

Read X and Y and print Y rows of decreasing numbers that shrink by one value per row.

## Supplied Python code

```python
def Number_In_Inverted_Right_Angled_Triangle():
    X,Y = int(input()),int(input())
    Start = 0
    for num in range(1,Y+1):
        Start += num
    Total = (Start + X - 1)
    for i in range(Y):
        for j in range(Y-i):
            print(Total,end=" ")
            Total -= 1
        print()
Number_In_Inverted_Right_Angled_Triangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'8 7 6 \n5 4 \n3 \n'` |
| X = 1, Y = 4 | `'1\n4\n'` | `'10 9 8 7 \n6 5 4 \n3 2 \n1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_right_angled_tri.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A descending right triangle of numbers.
- The supplied title is truncated in the source document; it is stored verbatim.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
