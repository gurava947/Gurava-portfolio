# Create & Print List

## Question

Create the list ['Rose', 183, 148, 123.64, False] and print it.

## Supplied Python code

```python
S = ['Rose', 183, 148, 123.64, False]
print(S)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| no input | '' | "['Rose', 183, 148, 123.64, False]\n" |

## Test cases

The separate unittest file contains 1 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_create_print_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: None.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
