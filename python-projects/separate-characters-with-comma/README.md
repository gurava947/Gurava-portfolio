# Separate Characters with Comma

## Question

Read a string and print its characters separated by commas.

## Supplied Python code

```python
S,word= input(),""
for i in S:
    word += i+","
print(word[:len(word)-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc | 'abc\n' | 'a,b,c\n' |
| Hello | 'Hello\n' | 'H,e,l,l,o\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_separate_characters_with_comma.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string.
- Output: One comma separated line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
