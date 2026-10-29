# List Indexing - 2

## Question

Read a count and then that many indices, printing each index followed by the language held at that position.

## Supplied Python code

```python
programming_languages_list = ["Python", "Java", "Ruby", "C", "C++", "Go", "R", "JavaScript", "Swift", "PHP", "Kotlin", "Perl"]
# Write your code here
N = int(input())
for i in range(N):
    index_num = int(input())
    print(index_num)
    print(programming_languages_list[index_num])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| indices 0 and 3 | '2\n0\n3\n' | '0\nPython\n3\nC\n' |
| index 11 | '1\n11\n' | '11\nPerl\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_list_indexing_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One count followed by that many indices.
- Output: The index and the language for each.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
