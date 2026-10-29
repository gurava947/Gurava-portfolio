# List Concatenation - 2

## Question

Read a count and then that many values, printing the fixed list with each of them appended.

## Supplied Python code

```python
L = ["apple", "78", "970.03"]

N = int(input())
for i in range(N):
    add_list_itmes = input()
    L += [add_list_itmes]
print(L)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| two values | '2\nmango\n55\n' | "['apple', '78', '970.03', 'mango', '55']\n" |
| one value | '1\nkiwi\n' | "['apple', '78', '970.03', 'kiwi']\n" |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_list_concatenation_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many strings.
- Output: One list.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
