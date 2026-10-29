# Replace First Letter in Words

## Question

Read a sentence and print it with the first letter of every word advanced to the next character.

## Supplied Python code

```python
S = input()
New_word = " " + S
Word = ""
for i in range(len(New_word)):
    if (New_word[i-1] == " "):
        Word += chr(ord(S[i-1]) + 1)
    else:
        Word += New_word[i]
output = Word[0].replace(" ","") + Word[1:]
print(output)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| cat dog | 'cat dog\n' | 'dat eog\n' |
| abc | 'abc\n' | 'bbc\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_replace_first_letter_in_words.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One sentence.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
