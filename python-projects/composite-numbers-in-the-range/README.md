# Composite Numbers in the range

## Question

Read X and Y and print each composite number from X to Y on its own line.

## Supplied Python code

```python
def Composite_Numbers_in_the_Range():
    X,Y = int(input()),int(input())
    for Num in range(X,Y+1):
        factotres = 0
        for i in range(2,Num-1):
            if (Num % i == 0):
                factotres += 1
        if(factotres == 0):
            pass
        
        else:
            print(Num)
Composite_Numbers_in_the_Range()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 10, Y = 20 | `'10\n20\n'` | `'10\n12\n14\n15\n16\n18\n20\n'` |
| X = 4, Y = 9 | `'4\n9\n'` | `'4\n6\n8\n9\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_composite_numbers_in_the_range.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: One composite number per line.
- Primes and 1 print nothing.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
