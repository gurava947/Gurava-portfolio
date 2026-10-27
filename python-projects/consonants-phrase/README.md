# Consonants Phrase

## Question

Read a sentence and print it with all vowels removed.

## Supplied Python code

```python
def consonants_Phrase():
    S,V,word = input(),"AEIOUaeiou",""
    for i in S:
        if i not in V:
           word += i
    print(word)
consonants_Phrase()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello world | `'hello world\n'` | `'hll wrld\n'` |
| aeiou | `'aeiou\n'` | `'\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_consonants_phrase.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: The sentence without vowels.
- Spaces are kept because only vowels are removed. If every character is a vowel the output is an empty line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
