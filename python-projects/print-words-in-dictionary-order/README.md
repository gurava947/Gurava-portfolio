# Print Words in Dictionary order

## Question

Read a sentence and print the first and last words in dictionary order, compared without regard to case.

## Supplied Python code

```python
s = input()

first_word = "z"
last_word = "a"
word = ""

for i in range(len(s)):
    char = s[i]
    if (char != " "):
        word += char
        
    if (char == " " or i == len(s)-1):
        if(word.lower() < first_word.lower()):
            first_word = word
                
        if (word.lower() > last_word.lower()):
            last_word = word
        word = ""   
word_dictionary = first_word + " " + last_word
print(word_dictionary)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| dog cat | 'dog cat\n' | 'cat dog\n' |
| Zebra apple | 'Zebra apple\n' | 'apple Zebra\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_words_in_dictionary_order.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: Two words separated by a space.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
