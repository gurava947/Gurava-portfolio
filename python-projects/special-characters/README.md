# Special Characters

## Question

Read a sentence and print the number of vowels and the number of other characters.

## Supplied Python code

```python
def special_char():
    S,V = input(),"AEIOUaeiou"
    S = S.replace(" ","")
    V_count,V_not_count = 0,0
    for i in S:
        if i in V:
            V_count += 1
        else:
            V_not_count += 1
    print(V_count)
    print(V_not_count)
special_char()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello world | `'hello world\n'` | `'3\n7\n'` |
| aeiou | `'aeiou\n'` | `'5\n0\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_special_characters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: Two lines: vowel count then other-character count.
- Only spaces are removed, so punctuation counts as a non-vowel character.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
