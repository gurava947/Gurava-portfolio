# First Uppercase Letter

## Question

Read a word and print its first uppercase letter.

## Supplied Python code

```python
Word,check_string,is_upper = input(),"",""
for i in Word:
    if (i.isupper()):
        print(i)
        break
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hEllo | `'hEllo\n'` | `'E\n'` |
| abc | `'abc\n'` | `''` |

A case with an empty expected stdout means the program prints nothing for that input; the comparison expects an empty string.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_uppercase_letter.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: The first uppercase letter, or nothing.
- Prints nothing when the word has no uppercase letter.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
