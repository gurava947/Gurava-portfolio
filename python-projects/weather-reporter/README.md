# Weather Reporter

## Question

Read a temperature and print the weather report for it.

## Supplied Python code

```python
def get_weather_report(temperature):
    if (Number_of_tem <= 18):
        return "Cold"
    elif(Number_of_tem < 35):
        return "Warm"
    else:
        return "Hot"
Number_of_tem  = int(input())
report = get_weather_report(temperature = Number_of_tem)
print(report)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| cold | '15\n' | 'Cold\n' |
| at the cold bound | '18\n' | 'Cold\n' |
| warm | '30\n' | 'Warm\n' |
| hot | '35\n' | 'Hot\n' |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_weather_reporter.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer temperature.
- Output: One label.
- `get_weather_report` compares the module-level `Number_of_tem` rather than its own parameter.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
