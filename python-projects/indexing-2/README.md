# Indexing - 2

## Question

Read a word and a position and print the character sitting at that position.

## Supplied Python code

```python
def indexing(arg_1, arg_2):
    print(arg_1[arg_2])
word = input()
index = int(input())
indexing(arg_1 = word,arg_2 = index)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| position two | 'Practice\n2\n' | 'a\n' |
| position zero | 'Hello\n0\n' | 'H\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_indexing_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word then one integer.
- Output: One character.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
