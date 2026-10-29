# Join Numbers

## Question

Read space-separated numbers and print them joined with commas.

## Supplied Python code

```python
S = input()
split_method = S.split()
print(",".join(split_method))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| four numbers | '1 2 3 4\n' | '1,2,3,4\n' |
| two numbers | '10 20\n' | '10,20\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_join_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated numbers.
- Output: One comma-separated line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
