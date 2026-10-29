# M Shape with * - 3

## Question

Read N and print an M formed from two triangles of zeroes separated by dot padding.

## Supplied Python code

```python
N = int(input())
for i in range(1,N+1):
    print((N-i)*(". "),end="")
    for j in range(i * 2 - 1):
        print("0 ",end="")
    print(2*(N-i)*(". "),end="")
    for Z in range(i * 2 - 1):
        print("0 ",end="")
    print((N-i)*(". "))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | '3\n' | '. . 0 . . . . 0 . . \n. 0 0 0 . . 0 0 0 . \n0 0 0 0 0 0 0 0 0 0 \n' |
| N = 2 | '2\n' | '. 0 . . 0 . \n0 0 0 0 0 0 \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_m_shape_with_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: An M of zeroes.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
