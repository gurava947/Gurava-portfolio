# Last half of List

## Question

Read a count and a line of numbers and print the last half of them as a list of integers.

## Supplied Python code

```python
N = int(input())
word = input().split()

if (len(word) % 2 == 0):
    half = (word[len(word)//2:])
else:
    half = (word[len(word)//2+1:])
list_Num = []
for i in half:
    i = int(i)
    list_Num += [i]
print(list_Num)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| even count | '4\n1 2 3 4\n' | '[3, 4]\n' |
| odd count | '3\n7 8 9\n' | '[9]\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_last_half_of_list.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer then one line of space-separated numbers.
- Output: One list of integers.
- The count is read but never used; the number of values on the second line decides the half.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
