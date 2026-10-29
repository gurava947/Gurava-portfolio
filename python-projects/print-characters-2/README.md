# Print Characters - 2

## Question

Read two integers M and N, then print the character for every Unicode code point from M to N, one per line.

## Supplied Python code

```python
M , N = int(input()),int(input())
for i in range(M,N+1):
    print(chr(i))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 65 to 69 | '65\n69\n' | 'A\nB\nC\nD\nE\n' |
| 97 to 100 | '97\n100\n' | 'a\nb\nc\nd\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_characters_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: One character per line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
