# Print the Input - 5

## Question

Read a word and print it back unchanged.

## Supplied Python code

```python
def word_of_out_put(word):
    return word
name = input()
meassage = word_of_out_put(name)
print(meassage)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| plain word | 'Hello\n' | 'Hello\n' |
| dotted word | 'Practice.folio\n' | 'Practice.folio\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_input_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: The same word.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
