# Reverse the Sentence

## Question

Read a sentence and print it with its characters in reverse.

## Supplied Python code

```python
S  = input()
print(S[::-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| one word | 'Practice\n' | 'ecitcarP\n' |
| two words | 'Hello World\n' | 'dlroW olleH\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_reverse_the_sentence.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One reversed line.
- The whole line is reversed, spaces included, so the words themselves read backwards too.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
