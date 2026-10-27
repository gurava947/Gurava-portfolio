# First Word in Uppercase

## Question

Read a sentence and print it with only the first word in uppercase.

## Supplied Python code

```python
Word,ending_spaces_index = input(),0
first_word = ""
for i in Word:
    if (i == " "):
        break
    else:
        first_word += i.upper()
print(first_word + Word[len(first_word) : ])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello world | `'hello world\n'` | `'HELLO world\n'` |
| python | `'python\n'` | `'PYTHON\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_word_in_uppercase.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: The sentence with its first word in uppercase.
- The remainder is sliced from len(first_word), so the original separator characters are preserved.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
