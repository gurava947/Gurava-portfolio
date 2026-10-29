# Even Numbers or Odd Numbers

## Question

Read a number and print every integer from zero up to it tagged EVEN or ODD.

## Supplied Python code

```python
def show_numbers(number):
   for i in range(number+1):
       checking = (str(i) + ' EVEN') if (i % 2 == 0) else (str(i) + ' ODD')
       print(checking)
number = int(input())
show_numbers(number=number)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| up to three | '3\n' | '0 EVEN\n1 ODD\n2 EVEN\n3 ODD\n' |
| up to four | '4\n' | '0 EVEN\n1 ODD\n2 EVEN\n3 ODD\n4 EVEN\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_even_numbers_or_odd_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One tagged integer per line.
- The range starts at zero, and zero prints as EVEN.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
