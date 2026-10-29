# Create & Print List - 3

## Question

Read a count and then that many integers, printing them as a list of numbers.

## Supplied Python code

```python
N,New_list = int(input()),[]
for i in range(N):
    number_of_inputs = input()
    number_of_inputs = int(number_of_inputs)
    New_list += [number_of_inputs]
print(New_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1, 2, 3 | '3\n1\n2\n3\n' | '[1, 2, 3]\n' |
| one value | '1\n42\n' | '[42]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_create_print_list_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
