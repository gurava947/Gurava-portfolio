# Split Numbers

## Question

Read space-separated numbers and print them as a list of integers.

## Supplied Python code

```python
S  = input()
Split_Method = S.split()
New_list = []
for i in Split_Method:
    number_of = int(i)
    New_list += [number_of]
print(New_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| five numbers | '1 2 3 4 5\n' | '[1, 2, 3, 4, 5]\n' |
| three numbers | '10 20 30\n' | '[10, 20, 30]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_split_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One line of space-separated numbers.
- Output: One list of integers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
