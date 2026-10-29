# Reverse Words in Sentence

## Question

Read a sentence and print its words in reverse order.

## Supplied Python code

```python
S = input().split()
New = S[::-1]
print(" ".join(New))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three words | 'Practice makes perfect\n' | 'perfect makes Practice\n' |
| two words | 'Hello World\n' | 'World Hello\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_reverse_words_in_sentence.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One line of words.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
