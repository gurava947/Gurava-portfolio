# Join Third Letter of Words

## Question

Read a sentence and print the third letter of every word joined with commas.

## Supplied Python code

```python
S,New  = input(),""
split_method = S.split()
for i in split_method:
    one_new = i
    New += (one_new[2]) + ","
print(New[:len(New)-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three words | 'Hello World Python\n' | 'l,r,t\n' |
| four words | 'Code With Plain Python\n' | 'd,t,a,t\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_join_third_letter_of_words.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One comma-separated line.
- Every word must have at least three characters; a shorter word raises an IndexError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
