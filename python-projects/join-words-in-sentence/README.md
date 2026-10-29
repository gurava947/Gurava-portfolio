# Join Words in Sentence

## Question

Read a sentence and print its words joined with dots.

## Supplied Python code

```python
S = input()
change_split = S.split()
join_doit = ".".join(change_split)
print(join_doit)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three words | 'Hello World Python\n' | 'Hello.World.Python\n' |
| two words | 'Practice folio\n' | 'Practice.folio\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_join_words_in_sentence.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One dot-separated line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
