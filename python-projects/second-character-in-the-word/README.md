# Second Character in the Word

## Question

Read a word and print the character at its second position.

## Supplied Python code

```python
def second_character(arg_1):
   return word[1]
word = input()
Second_word = second_character(arg_1 = word)
print(Second_word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Practice | 'Practice\n' | 'r\n' |
| Hello | 'Hello\n' | 'e\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_second_character_in_the_word.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: One character.
- `second_character` indexes the module-level `word` instead of its own parameter.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
