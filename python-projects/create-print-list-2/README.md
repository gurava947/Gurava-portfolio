# Create & Print List - 2

## Question

Read a count and then that many strings, printing them as a list.

## Supplied Python code

```python
New_list = []
N = int(input())
for i in range(N):
    list_add_strings = input()
    New_list += [list_add_strings]
print(New_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Red, Green | '2\nRed\nGreen\n' | "['Red', 'Green']\n" |
| one value | '1\nPython\n' | "['Python']\n" |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_create_print_list_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many strings.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
