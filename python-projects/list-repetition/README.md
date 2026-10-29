# List Repetition

## Question

Read an integer and print the list [1, 'two', '3', 4.0] repeated that many times.

## Supplied Python code

```python
L = [1, "two", "3", 4.0]
N = int(input())
print(L * N)
# Write your code here
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| twice | '2\n' | "[1, 'two', '3', 4.0, 1, 'two', '3', 4.0]\n" |
| once | '1\n' | "[1, 'two', '3', 4.0]\n" |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_list_repetition.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
