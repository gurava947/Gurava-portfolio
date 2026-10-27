# Triplets of Numbers

## Question

Read N and print how many triples i < j < z of positive integers satisfy i + j + z = N.

## Supplied Python code

```python
def Triplest_Of_number():
    N = int(input())
    Triplest_number = 0
    trip = ""
    for i in range(1,N+1):
        for j in range(i+1,N+1):
            for z in range(j+1,N+1):
                if (i+j+z == N):
                    Triplest_number += 1
                    trip += "(" + str(i) + "," + str(j) + "," + str(z) + ")" + "\n"
    print(Triplest_number)
    # print(trip)
Triplest_Of_number()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 9 | `'9\n'` | `'3\n'` |
| N = 7 | `'7\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_triplets_of_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The number of triples.
- Only triples with strictly increasing values are counted, and the search is O(N^3).
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
