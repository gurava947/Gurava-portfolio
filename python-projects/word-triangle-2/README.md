# Word Triangle - 2

## Question

Read a word and print it, then remove the last character and print again until one character remains.

## Supplied Python code

```python
def wordTriangle():
    word = input()
    for i in range(len(word)):
        print(word[:len(word)-i])
wordTriangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello | `'hello\n'` | `'hello\nhell\nhel\nhe\nh\n'` |
| abc | `'abc\n'` | `'abc\nab\na\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_word_triangle_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: Shrinking prefixes, one per line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
