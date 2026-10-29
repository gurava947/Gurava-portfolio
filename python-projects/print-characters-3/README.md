# Print Characters - 3

## Question

Read a count and then that many Unicode code points, and print the single word they spell.

## Supplied Python code

```python
def PrintCharacters():
    S = int(input())
    word = ""
    for i in range(S):
        Number = int(input())
        word += chr(Number)
    print(word)
PrintCharacters()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three code points | '3\n65\n66\n67\n' | 'ABC\n' |
| four code points | '4\n72\n105\n33\n33\n' | 'Hi!!\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_characters_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many code points.
- Output: One word.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
