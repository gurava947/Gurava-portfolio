# Replacing Characters of Sentence

## Question

Read a sentence and print it with every character replaced by its Unicode successor, leaving spaces where they were.

## Supplied Python code

```python
S,string = input(),""
for i in S:
    if (i == " "):
         string += chr((ord(i)))
    else:
        string += chr((ord(i) + 1))
print(string)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc def | 'abc def\n' | 'bcd efg\n' |
| Hi | 'Hi\n' | 'Ij\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_replacing_characters_of_sentence.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One sentence.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
