# Convert String to List

## Question

Read a string and print its characters as a list.

## Supplied Python code

```python
#S = input()
# Empty_list = []
# for i in S:
#     Empty_list += [i]
# print(Empty_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc | 'abc\n' | '' |
| hello | 'hello\n' | '' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_convert_string_to_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: One list.
- Every line of the supplied snippet is commented out, so it reads nothing and prints nothing. It is preserved exactly as supplied.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
