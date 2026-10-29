# Reverse Order

## Question

Read a count and then that many values, printing them in reverse order, one per line.

## Supplied Python code

```python
N = int(input())
New_list = []
for i in range(N):
    list_char = input()
    New_list += [list_char]
for i in New_list[::-1]:
    print(i)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three values | '3\ncat\ndog\nant\n' | 'ant\ndog\ncat\n' |
| two values | '2\n10\n20\n' | '20\n10\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_reverse_order.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many strings.
- Output: One value per line, reversed.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
