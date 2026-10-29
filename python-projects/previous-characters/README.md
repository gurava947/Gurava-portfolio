# Previous Characters

## Question

Read a sentence and print the character that precedes each letter in Unicode order, skipping spaces, one per line.

## Supplied Python code

```python
s = input()
count = 0
for i in range(len(s)):
    if (s[i] == " "):
        continue
    else:
        word = ord(s[i]) - 1
        print(chr(word))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc | 'abc\n' | '`\na\nb\n' |
| Hi there | 'Hi there\n' | 'G\nh\ns\ng\nd\nq\nd\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_previous_characters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One character per line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
