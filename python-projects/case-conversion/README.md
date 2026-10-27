# Case Conversion

## Question

Read a word and print it in lowercase with an underscore before every uppercase character.

## Supplied Python code

```python
def case_conversion():
    S = input()
    New_word = S[0].lower()
    for i in range(1,len(S)):
        if S[i].isupper():
            New_word += "_" + S[i].lower()
        else:
            New_word += S[i]
    print(New_word)
case_conversion()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| helloWorld | `'helloWorld\n'` | `'hello_world\n'` |
| myNameIs | `'myNameIs\n'` | `'my_name_is\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_case_conversion.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: Lowercase word with underscores before former uppercase letters.
- This is the same conversion as Case Conversion - 3 but with underscores instead of dashes.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
