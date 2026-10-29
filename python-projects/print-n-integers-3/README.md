# Print N Integers - 3

## Question

Read a count and print the integers from 1 up to it, one per line.

## Supplied Python code

```python
def print_numbers(number):
  for i in range(1,number+1):
      print(i)
number = int(input())
print_numbers(number)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three | '3\n' | '1\n2\n3\n' |
| five | '5\n' | '1\n2\n3\n4\n5\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_n_integers_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One integer per line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
