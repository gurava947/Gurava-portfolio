# Divisible by 5

## Question

Read a count and then that many integers, printing those divisible by 5 as a list.

## Supplied Python code

```python
N = int(input())
New_list = []
for i in range(N):
    list_value = int(input())
    if (list_value % 5 == 0 or list_value % 10 == 0):
        New_list += [list_value]
print(New_list)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| five values | '5\n10\n7\n25\n3\n50\n' | '[10, 25, 50]\n' |
| none match | '3\n1\n2\n3\n' | '[]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many integers.
- Output: One list.
- The test also asks for divisibility by 10, which every multiple of 5 already satisfies.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
