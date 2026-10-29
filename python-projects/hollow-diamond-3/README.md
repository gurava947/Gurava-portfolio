# Hollow Diamond - 3

## Question

The snippet supplied under this title converts a duration written in minutes or seconds into hours.

## Supplied Python code

```python
T = input()
for i in T:
    if (i == "M"):
        print(str(round(int(T[:len(T)-1])/60,2)) + "H")
    elif (i == 'S'):
        print(str(round(int(T[:len(T)-1])/3600,2))+"H")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 90M | '90M\n' | '1.5H\n' |
| 45M | '45M\n' | '0.75H\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_diamond_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One duration suffixed M or S.
- Output: The equivalent hours.
- The supplied material repeats the Time Conversion snippet under this title, so no hollow diamond program was included with it. The snippet is preserved verbatim and the duplicate is recorded in the notes.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
