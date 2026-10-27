# Traingles

## Question

Write a program that reads three side lengths and prints Equilateral, Isosceles or Scalene.

## Supplied Python code

```python
A,B,C = int(input()),int(input()),int(input())
print("Equilateral" if A == B == C else 
"Isosceles" if A == B or B == C or C == A 
else "Scalene")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3, 3, 3 | `'3\n3\n3\n'` | `'Equilateral\n'` |
| 5, 5, 8 | `'5\n5\n8\n'` | `'Isosceles\n'` |
| 3, 4, 5 | `'3\n4\n5\n'` | `'Scalene\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_traingles.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Three integers, one per line.
- Output: Equilateral, Isosceles or Scalene.
- The code checks side equality only; it does not verify the triangle inequality.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
