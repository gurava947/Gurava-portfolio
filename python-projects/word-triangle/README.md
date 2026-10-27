# Word Triangle

## Question

Read a word and print each prefix on its own line, starting with the first letter.

## Supplied Python code

```python
word = input()
def WordTriangle(word):
    Triangle = ""
    for i in word:
        Triangle += i
        print(Triangle)
WordTriangle(word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| cat | `'cat\n'` | `'c\nca\ncat\n'` |
| ab | `'ab\n'` | `'a\nab\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_word_triangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: Growing prefixes, one per line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
