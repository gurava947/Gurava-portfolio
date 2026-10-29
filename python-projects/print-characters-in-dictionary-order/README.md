# Print Characters in Dictionary Order

## Question

Read a string and print its smallest and largest characters by Unicode value, separated by a space.

## Supplied Python code

```python
S = input()
li = []
for i in S:
    convart = ord(i)
    li.append(convart)
print(str(chr(min(li))) + " " + str(chr(max(li))))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| python | 'python\n' | 'h y\n' |
| Banana | 'Banana\n' | 'B n\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_characters_in_dictionary_order.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: Two characters.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
