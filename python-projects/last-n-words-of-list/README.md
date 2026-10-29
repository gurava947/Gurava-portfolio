# Last N words of List

## Question

Read a sentence and a count and print the last that many words in reverse as a list.

## Supplied Python code

```python
S = input().split()
N = int(input())
word = (S[-N:])
print(word[::-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| last two | 'a b c d e\n2\n' | "['e', 'd']\n" |
| last three | 'Practice makes perfect easy\n3\n' | "['easy', 'perfect', 'makes']\n" |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_last_n_words_of_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence then one integer.
- Output: One list of words.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
