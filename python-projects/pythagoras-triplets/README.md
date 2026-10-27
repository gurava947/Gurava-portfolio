# Pythagoras Triplets

## Question

Read N and print how many triples a < b < c up to N satisfy a² + b² = c².

## Supplied Python code

```python
def Pythagoras_Triplets():
    N = int(input())
    Triplest = 0
    for A in range(1,N+1):
        for B in range(A+1,N+1):
            for C in range(B+1,N+1):
                if (((A) ** 2) + ((B) ** 2) == ((C) ** 2)):
                    Triplest += 1
    print(Triplest)
Pythagoras_Triplets()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 15 | `'15\n'` | `'4\n'` |
| N = 12 | `'12\n'` | `'2\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_pythagoras_triplets.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The number of Pythagorean triples.
- The search is O(N^3), so large inputs are slow.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
