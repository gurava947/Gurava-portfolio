# Reverse the Letters in Words of the of the sentence

## Question

Read a sentence and print each of its words with its letters reversed.

## Supplied Python code

```python
S = input().split()
for i in S:
    print(i[::-1],end=" ")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| two words | 'Hello World\n' | 'olleH dlroW ' |
| three words | 'Practice makes perfect\n' | 'ecitcarP sekam tcefrep ' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_reverse_the_letters_in_words_of_the_of_the_sentence.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One line of reversed words.
- Every word is printed with `end=" "`, so the output keeps a trailing space and finishes without a newline.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
