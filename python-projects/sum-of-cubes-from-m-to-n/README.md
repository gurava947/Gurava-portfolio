# Sum of Cubes from M to N

## Question

Read a range and print the sum of the cubes of every number inside it.

## Supplied Python code

```python
def sum_of_cubes_m_to_n(m, n):
    cube_numbers = 0
    for i in range(m,n+1):
        cube_numbers += (i ** 3)
    print(cube_numbers)
m = int(input())
n = int(input())
sum_of_cubes_m_to_n(m,n)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| one to three | '1\n3\n' | '36\n' |
| two to four | '2\n4\n' | '99\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_cubes_from_m_to_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One integer.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
