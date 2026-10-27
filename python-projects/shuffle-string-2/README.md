# Shuffle String - 2

## Question

Read two words and print a new word taking even positions from the first word and odd positions from the second.

## Supplied Python code

```python
def shuffleString():
    S1 = input()
    S2 = input()
    result = ""
    for i in range(len(S1)):
        if (i % 2 == 0):
            result += S1[i]
        else:
            result += S2[i]
    print(result)
shuffleString()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc and xyz | `'abc\nxyz\n'` | `'ayc\n'` |
| hello and world | `'hello\nworld\n'` | `'hollo\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_shuffle_string_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two words.
- Output: One merged word.
- Only the first word's length controls the loop, so extra characters in the second word are ignored.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
