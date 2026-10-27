# Weather condition

## Question

Write a program that reads a temperature and prints Freezing weather below 0, Very Cold below 10, Cold below 20, Normal below 30, Hot below 40, otherwise Very Hot.

## Supplied Python code

```python
T = float(input())
if 0 > T:
    print("Freezing weather")
elif 10 > T:
    print("Very Cold weather")
elif 20 > T:
    print("Cold weather")
elif 30 > T:
    print("Normal")
elif 40 > T:
    print("Hot")
else:
    print("Very Hot")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| -5 is freezing | `'-5\n'` | `'Freezing weather\n'` |
| 15 is cold | `'15\n'` | `'Cold weather\n'` |
| 25 is normal | `'25\n'` | `'Normal\n'` |
| 45 is very hot | `'45\n'` | `'Very Hot\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_weather_condition.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One decimal temperature.
- Output: A weather description.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
