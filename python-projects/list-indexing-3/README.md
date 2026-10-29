# List Indexing - 3

## Question

Read the size of a list and a number of queries, then read that many integers followed by that many indices, and print the value stored at each index.

## Supplied Python code

```python
N , T = int(input()),int(input())
New_list = []
for i in range(N):
    read_input = int(input())
    New_list += [read_input]

for j in range(T):
    index = int(input())
    print(New_list[index])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| five values, indices 0 and 4 | '5\n2\n10\n20\n30\n40\n50\n0\n4\n' | '10\n50\n' |
| three values, index 2 | '3\n1\n7\n8\n9\n2\n' | '9\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_list_indexing_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A list size, a query count, the list, then the indices.
- Output: One value per index.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
