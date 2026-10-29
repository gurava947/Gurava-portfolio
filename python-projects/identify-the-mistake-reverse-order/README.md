# Identify the Mistake - Reverse Order

## Question

Read two comma-separated lists and print each item of the first beside the mirrored item of the second.

## Supplied Python code

```python
list_a = input().split(",")
list_b = input().split(",")


lenth_of_a = len(list_a)
for i in range(lenth_of_a):
    num1 = list_a[i]
    num2 = list_b[lenth_of_a - 1 - i]
    values = num1 + " " + num2
    print(values)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| three pairs | '1,2,3\n4,5,6\n' | '1 6\n2 5\n3 4\n' |
| two pairs | 'a,b\nx,y\n' | 'a y\nb x\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_identify_the_mistake_reverse_order.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two comma-separated lists, one per line.
- Output: One pair per line.
- The loop walks the length of the first list while indexing the second, so a shorter second list raises an IndexError; the fixtures keep both lists the same length.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
