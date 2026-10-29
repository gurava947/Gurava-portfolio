# Print Smallest Letter

## Question

Read a word and print its smallest character by Unicode value.

## Supplied Python code

```python
S = input()
smllest_number = ord(S[0])
for i in S[1:]:
     if (ord(i) < smllest_number):
         smllest_number = ord(i)
print(chr(smllest_number))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| python | 'python\n' | 'h\n' |
| Banana | 'Banana\n' | 'B\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_smallest_letter.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: One character.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
